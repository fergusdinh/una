import { Request, Response } from 'express';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import {
  Allow,
  Ctx,
  Permission,
  RequestContext,
  Administrator,
  ErrorResultUnion,
  Channel,
  Transaction,
  NativeAuthStrategyError,
  AuthService,
  UserService,
  ConfigService,
  AdministratorService,
  IllegalOperationError,
  CustomAdministratorFields,
  SessionService,
} from '@vendure/core';
import { BaseAuthResolver } from '@vendure/core/dist/api/resolvers/base/base-auth.resolver';
import { saasPermission } from '../index';
import { SassService } from './sass.service';
import { CreateShopperInput } from '../types';
import {
  CreateChannelResult,
  NativeAuthenticationResult,
  MutationLoginArgs,
  AuthenticationResult,
} from '@vendure/common/lib/generated-types';

/**
 * Graphql resolvers for retrieving and updating connector for channel
 */
@Resolver()
export class SassResolver extends BaseAuthResolver {
  constructor(
    private sassService: SassService,
    private sessionService: SessionService,
    authService: AuthService,
    userService: UserService,
    configService: ConfigService,
    administratorService: AdministratorService
  ) {
    super(authService, userService, administratorService, configService);
  }

  @Mutation()
  @Allow(
    saasPermission.Permission,
    Permission.CreateAdministrator,
    Permission.CreateChannel
  )
  async createShopper(
    @Ctx() ctx: RequestContext,
    @Args('input') input: CreateShopperInput
  ): Promise<
    Administrator | ErrorResultUnion<CreateChannelResult, Channel> | undefined
  > {
    return await this.sassService.createShopper(ctx, input);
  }

  @Transaction()
  @Mutation()
  @Allow(Permission.Public)
  async login(
    @Args() args: MutationLoginArgs,
    @Ctx() ctx: RequestContext,
    @Context('req') req: Request,
    @Context('res') res: Response
  ): Promise<NativeAuthenticationResult | undefined> {
    const nativeAuthStrategyError = this.requireNativeAuthStrategy();
    if (nativeAuthStrategyError) {
      return nativeAuthStrategyError;
    }
    const account = (await super.baseLogin(args, ctx, req, res)) as
      | AuthenticationResult
      | any;
    if (account?.id === 1) {
      return account;
    }
    const administrator = await this.administratorService.findOneByUserId(
      ctx,
      account?.id
    );
    if (administrator as any) {
      const { customFields }: CustomAdministratorFields | undefined | any =
        administrator;
      if (customFields?.active) {
        return account;
      }
      throw new IllegalOperationError('The account not active!');
    }
  }

  @Transaction()
  @Mutation()
  @Allow(Permission.UpdateAdministrator)
  async updateAdministrator(
    @Ctx() ctx: RequestContext,
    @Args() args: any
  ): Promise<Administrator> {
    const { input } = args;
    if (input.id === 1) {
      return await this.administratorService.update(ctx, input);
    }
    if (!input.customFields.active) {
      const administrator = (await this.administratorService.findOne(
        ctx,
        input?.id
      )) as Administrator | any;
      await this.sessionService.deleteSessionsByUser(ctx, administrator?.user);
    }
    return await this.administratorService.update(ctx, input);
  }

  protected requireNativeAuthStrategy() {
    return super.requireNativeAuthStrategy() as
      | NativeAuthStrategyError
      | undefined;
  }
}
