import {
  ExportConnectorConfig,
  ExportEntityConfig,
} from './../connector.plugin';
import { CONNECTOR_OPTIONS, ENTITY_OPTIONS, loggerCtx } from './../constants';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  Administrator,
  AdministratorService,
  Allow,
  Channel,
  Ctx,
  Customer,
  CustomerService,
  ErrorResultUnion,
  ID,
  IllegalOperationError,
  Logger,
  Permission,
  RequestContext,
  Transaction,
  TransactionalConnection,
} from '@vendure/core';
import { ConnectorService } from './connector.service';
import { Inject } from '@nestjs/common';
import {
  CreateCustomerResult,
  MutationCreateCustomerArgs,
} from '@vendure/common/lib/generated-types';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { ConnectorChannelEntity } from './entities/connector/connector-channel.entity';
@Resolver()
export class ConnectorResolver {
  constructor(
    private connectorService: ConnectorService,
    private customerService: CustomerService,
    private connection: TransactionalConnection,
    private administratorService: AdministratorService,
    @Inject(CONNECTOR_OPTIONS) private optionsConnector: ExportConnectorConfig,
    @Inject(ENTITY_OPTIONS) private optionsEntity: ExportEntityConfig
  ) {}

  @Query()
  async getAllConnectors(
    @Ctx() ctx: RequestContext
  ): Promise<ConnectorChannelEntity[] | undefined> {
    const connectors = await this.connectorService.getAllConnectors(
      ctx.channelId as string
    );
    return connectors;
  }

  @Query()
  async getConnectorByType(
    @Ctx() ctx: RequestContext,
    @Args('type') type: string
  ): Promise<ConnectorChannelEntity | undefined> {
    const connector = await this.connectorService.getConnectorByType(
      ctx.channelId as string,
      type
    );
    return connector;
  }

  @Mutation()
  async updateConnector(
    @Ctx() ctx: RequestContext,
    @Args('settings') settings: string,
    @Args('type') type: string
  ): Promise<ConnectorChannelEntity | undefined> {
    const connector = await this.connectorService.saveConnector(
      ctx.channelId as string,
      settings,
      type
    );
    return connector;
  }

  @Mutation()
  async deleteConnector(
    @Ctx() ctx: RequestContext,
    @Args('type') type: string
  ): Promise<string | undefined> {
    await this.connectorService.deleteConnector(ctx.channelId as string, type);
    return 'success';
  }

  @Query()
  availableConnectorsExport(): { type: string; name: string }[] {
    return this.optionsConnector.connectors.map((connector) => {
      return {
        type: connector.type,
        name: connector.name,
        icon: connector.icon,
        description: connector.description,
      };
    });
  }

  @Query()
  getConnectorConfigUi(@Args('type') type: string): string {
    return JSON.stringify(
      this.optionsConnector.connectors.find((connector) => {
        if (connector.type === type) {
          return connector;
        }
      })
    );
  }

  @Query()
  availableEntitiesExport(): string[] {
    return this.optionsEntity.entities.map((entity) => {
      return entity.constructor.name;
    });
  }

  @Query()
  async checkShopifyDomainIsExsit(
    @Args('shopifyDomain') shopifyDomain: string
  ): Promise<boolean | undefined> {
    const shopper = await this.connection.getRepository(Channel).findOne({
      where: {
        customFields: {
          shopify_domain: shopifyDomain,
        },
      },
    });
    if (shopper) {
      return true;
    }
    return false;
  }

  @Query()
  async getAllConnectorsConnectedOfChannel(
    @Ctx() ctx: RequestContext
  ): Promise<ConnectorChannelEntity[] | undefined> {
    const connectors = await this.connection
      .getRepository(ConnectorChannelEntity)
      .find({
        where: {
          channelId: String(ctx.channelId),
        },
      });
    return connectors;
  }

  /* Valid phone area codes */
  @Transaction()
  @Mutation()
  @Allow(Permission.CreateCustomer)
  async createCustomer(
    @Ctx() ctx: RequestContext,
    @Args() args: MutationCreateCustomerArgs
  ): Promise<ErrorResultUnion<CreateCustomerResult, Customer>> {
    const { input, password } = args;
    if (
      !isValidPhoneNumber(
        input.phoneNumber as string,
        input.customFields.country_select as any
      )
    ) {
      Logger.error('Invalid phone number!', loggerCtx);
      throw new IllegalOperationError('Invalid phone number!');
    }
    return this.customerService.create(ctx, input, password || undefined);
  }
}
