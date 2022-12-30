import { Injectable } from '@nestjs/common';
import {
  Administrator,
  RequestContext,
  TransactionalConnection,
  ChannelService,
  isGraphQlErrorResult,
  ZoneService,
  CurrencyCode,
  LanguageCode,
  Role,
  Permission,
  NativeAuthenticationMethod,
  User,
  AuthenticatedSession,
  AuthService,
  ConfigService,
  SessionService,
  AdministratorService,
} from '@vendure/core';
import { Request, Response } from 'express';
import { ConnectorChannelEntity } from '@bavaan/vendure-plugin-connector/src';
import { events } from '../types';
import { PasswordCipher } from '@vendure/core/dist/service/helpers/password-cipher/password-cipher';
import { setSessionToken } from '@vendure/core/dist/api/common/set-session-token';

@Injectable()
export class ShopsService {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly channelService: ChannelService,
    private readonly zoneService: ZoneService,
    private readonly passwordCipher: PasswordCipher,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly sessionService: SessionService,
    private readonly administratorService: AdministratorService
  ) {}

  public async findOrCreate(
    ctx: RequestContext,
    req: Request,
    res: Response,
    domain: string,
    accessToken: string
  ) {
    try {
      const shopper = (await this.isShopDomainExist(domain)) as Administrator;
      if (shopper) {
        if (ctx.session?.user) {
          await this.sessionService.deleteSessionsByUser(
            ctx,
            ctx.session?.user as unknown as User
          );
        }
        /* Create authenticated session */
        const authenticatedSession =
          (await this.authService.createAuthenticatedSessionForUser(
            ctx,
            shopper?.user,
            'native'
          )) as AuthenticatedSession;
        /* Login with this session */
        setSessionToken({
          req,
          res,
          authOptions: this.configService.authOptions,
          rememberMe: false,
          sessionToken: authenticatedSession.token,
        });
      } else {
        if (ctx.session?.user) {
          const shopper = await this.administratorService.findOneByUserId(
            ctx,
            ctx.session.user.id
          );
          if (shopper) {
            await this.administratorService.update(ctx, {
              id: shopper?.id,
              customFields: {
                shopify_domain: domain,
              },
            });
          }
          for (const channelOfShopper of ctx.session.user.channelPermissions) {
            if (channelOfShopper.id === ctx.channelId) {
              await this.channelService.update(ctx, {
                id: channelOfShopper.id,
                customFields: {
                  shopify_domain: domain,
                },
              });
              const connectorChannel = await this.connection
                .getRepository(ConnectorChannelEntity)
                .findOne({
                  where: {
                    channelId: String(channelOfShopper.id),
                    type: 'shopify',
                  },
                });
              if (connectorChannel) {
                const rawSettings = JSON.parse(connectorChannel?.settings);
                await this.connection
                  .getRepository(ConnectorChannelEntity)
                  .update(
                    {
                      id: connectorChannel.id,
                    },
                    {
                      settings: JSON.stringify({
                        ...rawSettings,
                        shopify_access_token_offline: accessToken,
                        api_version: '2021-10',
                      }),
                    }
                  );
              }
            }
          }
        } else {
          this.createShopper(ctx, req, res, domain, accessToken);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async createShopper(
    ctx: RequestContext,
    req: Request,
    res: Response,
    domain: string,
    accessToken: string
  ) {
    try {
      /* Create zone for channel with default = Us */
      const zone = await this.zoneService.create(ctx, {
        name: `${domain}-US`,
      });
      /* Create new channel */
      const channel = await this.channelService.create(ctx, {
        code: `Channel-1`,
        currencyCode: CurrencyCode.USD,
        defaultLanguageCode: LanguageCode.en,
        defaultShippingZoneId: zone.id,
        defaultTaxZoneId: zone.id,
        pricesIncludeTax: false,
        token: this.generateToken(),
        customFields: {
          shopify_domain: domain,
        },
      });
      if (isGraphQlErrorResult(channel)) {
        return channel;
      }

      /* Create fake channel for test */
      const zone_channel_2 = await this.zoneService.create(ctx, {
        name: `channel-2-US`,
      });
      const channel_2 = await this.channelService.create(ctx, {
        code: `Channel-2`,
        currencyCode: CurrencyCode.USD,
        defaultLanguageCode: LanguageCode.en,
        defaultShippingZoneId: zone_channel_2.id,
        defaultTaxZoneId: zone_channel_2.id,
        pricesIncludeTax: false,
        token: this.generateToken(),
      });
      if (isGraphQlErrorResult(channel_2)) {
        return channel_2;
      }
      /* ===================================== */

      /* Create new role for channel */
      const role = await this.connection.getRepository(Role).save({
        code: `${domain}`,
        description: `${domain}"s role`,
        permissions: [
          Permission.ReadProduct,
          Permission.DeleteProduct,
          Permission.UpdateProduct,
          Permission.CreateProduct,
          Permission.CreateAsset,
          Permission.ReadAsset,
          Permission.DeleteAsset,
          Permission.DeleteAsset,
          Permission.Authenticated,
          Permission.CreateCustomer,
          Permission.ReadCustomer,
          Permission.DeleteCustomer,
          Permission.UpdateCustomer,
          Permission.CreateCatalog,
          Permission.ReadCatalog,
          Permission.DeleteCatalog,
          Permission.DeleteCatalog,
          Permission.ReadOrder,
          Permission.CreateOrder,
          Permission.DeleteOrder,
          Permission.UpdateOrder,
          Permission.ReadSettings,
          Permission.UpdateSettings,
          Permission.CreateSettings,
          Permission.DeleteSettings,
          Permission.ReadShippingMethod,
          Permission.CreateShippingMethod,
          Permission.DeleteShippingMethod,
          Permission.UpdateShippingMethod,
          Permission.ReadPaymentMethod,
          Permission.CreatePaymentMethod,
          Permission.DeletePaymentMethod,
          Permission.DeletePaymentMethod,
          Permission.ReadChannel,
          Permission.UpdateZone,
          Permission.CreateZone,
          Permission.DeleteZone,
          Permission.ReadZone,
          Permission.ReadTaxRate,
          Permission.ReadTaxCategory,
          Permission.CreateTaxRate,
          Permission.DeleteTaxRate,
          Permission.UpdateTaxRate,
          Permission.CreateTaxCategory,
          Permission.UpdateTaxCategory,
          Permission.DeleteTaxCategory,
          Permission.UpdateChannel,
          Permission.CreateCountry,
          Permission.DeleteCountry,
          Permission.ReadCountry,
          Permission.UpdateCountry,
          Permission.UpdateGlobalSettings,
        ],
        channels: [channel, channel_2],
      });
      /* Assign settings connector for new Channel */
      await this.connection.getRepository(ConnectorChannelEntity).save({
        channelId: String(channel.id),
        type: 'shopify',
        settings: JSON.stringify({
          url: domain,
          api_version: '2021-10',
          shopify_access_token_offline: accessToken,
          events,
        }),
      });
      /* Create email and use this for identifier value */
      const email = `admin${this.randomInteger(1, 100)}@` + domain;
      /* Create authentication method */
      const authenticationMethod = await this.connection
        .getRepository(ctx, NativeAuthenticationMethod)
        .save(
          new NativeAuthenticationMethod({
            identifier: email,
            passwordHash: await this.passwordCipher.hash(accessToken),
          })
        );
      /* Create new user with role and authentication method created */
      const user = await this.connection.getRepository(User).save({
        verified: true,
        identifier: email,
        authenticationMethods: [authenticationMethod],
        roles: [role],
      });
      /* Create shopper */
      const shopper = await this.connection.getRepository(Administrator).save({
        emailAddress: email,
        user: user,
        customFields: {
          shopify_domain: domain,
        },
        firstName: domain,
        lastName: domain,
      });
      /* Create authenticated session */
      const authenticatedSession =
        (await this.authService.createAuthenticatedSessionForUser(
          ctx,
          shopper?.user,
          'native'
        )) as AuthenticatedSession;
      /* Login with session created */
      setSessionToken({
        req,
        res,
        authOptions: this.configService.authOptions,
        rememberMe: false,
        sessionToken: authenticatedSession.token,
      });
    } catch (error) {
      console.log(error);
    }
  }

  public generateToken(): string {
    const randomString = () => Math.random().toString(36).substr(3, 10);
    return `${randomString()}${randomString()}`;
  }

  public randomInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public async findOneChannelByShopDomain() {
    try {
    } catch (error) {
      console.log(error);
    }
  }

  public async isShopDomainExist(
    domain: string
  ): Promise<Administrator | undefined> {
    try {
      return await this.connection.getRepository(Administrator).findOne({
        where: {
          customFields: {
            shopify_domain: domain,
          },
          deletedAt: null,
        },
        relations: ['user'],
      });
    } catch (error) {
      console.log(error);
    }
  }
}
