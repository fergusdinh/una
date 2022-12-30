import {
  SubscriptionService,
  CREATE_CUSTOMER,
  CREATE_SUBSCRIPTION,
} from '@bavaan/vendure-plugin-subscription';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  ChannelService,
  RoleService,
  RequestContext,
  AdministratorService,
  isGraphQlErrorResult,
  Permission,
  Administrator,
  Channel,
  ErrorResultUnion,
  TransactionalConnection,
  ID,
} from '@vendure/core';
// import { loggerCtx } from '../constants';
import { CreateChannelResult } from '@vendure/common/lib/generated-types';
import { CreateShopperInput } from '../types';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class SassService implements OnApplicationBootstrap {
  constructor(
    private connection: TransactionalConnection,
    private roleService: RoleService,
    private subscriptionService: SubscriptionService,
    private channelService: ChannelService,
    private administratorService: AdministratorService
  ) {}

  async onApplicationBootstrap(): Promise<void> {}

  public generateToken(): string {
    const randomString = () => Math.random().toString(36).substr(3, 10);
    return `${randomString()}${randomString()}`;
  }

  public async createMultipleChannel(
    ctx: RequestContext,
    amoutChannel: number
  ): Promise<ErrorResultUnion<CreateChannelResult, Channel> | any> {
    const multipleChannel: ID[] = [];
    for (let index = 0; index < amoutChannel; index++) {
      const channel = await this.channelService.create(ctx, {
        code: uuidv4(),
        currencyCode: ctx.channel.currencyCode,
        defaultLanguageCode: ctx.channel.defaultLanguageCode,
        defaultShippingZoneId: ctx.channel.defaultShippingZone.id,
        defaultTaxZoneId: ctx.channel.defaultTaxZone.id,
        pricesIncludeTax: ctx.channel.pricesIncludeTax,
        token: this.generateToken(),
      });
      if (isGraphQlErrorResult(channel)) {
        return channel;
      }
      const superAdminRole = await this.roleService.getSuperAdminRole(ctx);
      const customerRole = await this.roleService.getCustomerRole(ctx);
      await this.roleService.assignRoleToChannel(
        ctx,
        superAdminRole.id,
        channel?.id
      );
      await this.roleService.assignRoleToChannel(
        ctx,
        customerRole.id,
        channel?.id
      );
      multipleChannel.push(channel?.id);
    }
    return multipleChannel;
  }

  public async createShopper(
    ctx: RequestContext,
    input: CreateShopperInput
  ): Promise<
    Administrator | ErrorResultUnion<CreateChannelResult, Channel> | any
  > {
    // Check email is exsit
    const isExsitEmail = await this.connection
      .getRepository(Administrator)
      .findOne({ emailAddress: input.email_address });

    if (!isExsitEmail) {
      // create customer lago
      const customerLago =
        await this.subscriptionService.sassSubscriptionRequest(
          CREATE_CUSTOMER,
          {
            input: {
              name: input.first_name + ' ' + input.last_name,
              externalId: uuidv4(),
              email: input.email_address,
              ...(input.provider_customer_id && {
                stripeCustomer: {
                  providerCustomerId: input.provider_customer_id,
                },
              }),
            },
          }
        );
      // Assgin customer to plan define
      const planAssignToCustomer =
        await this.subscriptionService.sassSubscriptionRequest(
          CREATE_SUBSCRIPTION,
          {
            input: {
              customerId: customerLago?.createCustomer?.id,
              planId: input.plan_id,
              billingTime: input.billing_time,
            },
          }
        );

      // Get all billable metrics
      const billableMetrics =
        planAssignToCustomer?.createSubscription?.plan?.charges;

      // create channel
      const channelsAvaiable = billableMetrics?.filter(
        (channel: any) =>
          channel?.billableMetric?.description.toLowerCase() === 'channel'
      );
      const multipleChannel = await this.createMultipleChannel(
        ctx,
        channelsAvaiable.length
      );

      // create role
      const permissionsAvaiable = billableMetrics.filter(
        (permission: any) =>
          permission?.billableMetric?.description.toLowerCase() === 'permission'
      );
      const role = await this.roleService.create(ctx, {
        code: uuidv4(),
        description: `${input.first_name}'s role`,
        permissions: permissionsAvaiable.map((permission: any) => {
          return Object.values(Permission)[
            Object.keys(Permission).indexOf(permission.billableMetric.code)
          ];
        }),
        channelIds: multipleChannel,
      });

      // create shopper
      const shopper = await this.administratorService.create(ctx, {
        emailAddress: input.email_address,
        firstName: input.first_name,
        lastName: input.last_name,
        password: input.password,
        roleIds: [role.id],
        customFields: {
          active: true,
          external_id_lago: customerLago?.createCustomer?.externalId,
        },
      });
      return shopper;
    } else {
      throw new Error('Email already exist!');
    }
  }
}
