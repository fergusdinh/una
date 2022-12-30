import {
  RequestContext,
  TransactionalConnection,
  Logger,
  Channel,
} from '@vendure/core';
import { Request, Response } from 'express';
import { ShopifyAuthAfterHandler } from '@nestjs-shopify/auth';
import { Injectable } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common';
import { ShopifyWebhooksService } from '@nestjs-shopify/webhooks';
import { ShopifyAppBridgePlugin } from '../../plugin';
import { loggerCtx } from '../../constants';
import { SessionEntity } from '../../api';
import { ShopsService } from '../../shops/shops.service';
import { ConnectorChannelEntity } from '@bavaan/vendure-plugin-connector/src';

export const events: string[] = [
  'ProductEvent',
  'ProductVariantChannelEvent',
  'ProductVariantEvent',
  'AccountRegistrationEvent',
  'AccountVerifiedEvent',
  'AdministratorEvent',
  'AssetChannelEvent',
  'AssetEvent',
  'AttemptedLoginEvent',
  'ChangeChannelEvent',
  'ChannelEvent',
  'CollectionEvent',
  'CollectionModificationEvent',
  'CountryEvent',
  'CouponCodeEvent',
  'CustomerAddressEvent',
  'CustomerEvent',
  'ZoneMembersEvent',
  'CustomerGroupEntityEvent',
  'CustomerGroupChangeEvent',
  'FacetEvent',
  'FacetValueEvent',
  'FulfillmentEvent',
  'FulfillmentStateTransitionEvent',
  'GlobalSettingsEvent',
  'HistoryEntryEvent',
  'IdentifierChangeEvent',
  'IdentifierChangeRequestEvent',
  'LoginEvent',
  'LogoutEvent',
  'OrderEvent',
  'OrderLineEvent',
  'OrderPlacedEvent',
  'OrderStateTransitionEvent',
  'PasswordResetEvent',
  'PasswordResetVerifiedEvent',
  'PaymentMethodEvent',
  'PaymentStateTransitionEvent',
  'ProductChannelEvent',
  'ProductOptionEvent',
  'ProductOptionGroupChangeEvent',
  'ProductOptionGroupEvent',
  'PromotionEvent',
  'RefundStateTransitionEvent',
  'RoleChangeEvent',
  'RoleEvent',
  'SearchEvent',
  'ShippingMethodEvent',
  'StockMovementEvent',
  'TaxCategoryEvent',
  'TaxRateEvent',
  'ZoneEvent',
];

@Injectable()
export class AfterAuthHandlerService
  implements ShopifyAuthAfterHandler, OnApplicationBootstrap
{
  constructor(
    private readonly shopsService: ShopsService,
    private readonly connection: TransactionalConnection,
    private readonly webhookService: ShopifyWebhooksService
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    Logger.info(
      `Login using: https://${ShopifyAppBridgePlugin.options.hostName}/admin?shop=${ShopifyAppBridgePlugin.options.shop}`,
      loggerCtx
    );
    Logger.info(
      `Install using: https://${ShopifyAppBridgePlugin.options.hostName}/api/offline/auth?shop=${ShopifyAppBridgePlugin.options.shop}`,
      loggerCtx
    );
  }

  public async afterAuth(req: Request, res: Response, session: SessionEntity) {
    const { isOnline, shop, accessToken, id } = session;
    const { host } = req.query;
    const { vendureRequestContext } = req as any;
    if (isOnline) {
      if (!(await this.shopsService.isShopDomainExist(shop))) {
        return res.redirect(`/api/offline/auth?shop=${shop}`);
      }
      const channel = await this.connection.getRepository(Channel).findOne({
        where: {
          customFields: {
            shopify_domain: shop,
          },
        },
      });
      if (channel) {
        const connectorChannel = await this.connection
          .getRepository(ConnectorChannelEntity)
          .findOne({
            where: {
              channelId: String(channel.id),
              type: 'shopify',
            },
          });
        if (connectorChannel) {
          const rawSettings = JSON.parse(connectorChannel?.settings);
          await this.connection.getRepository(ConnectorChannelEntity).update(
            {
              id: connectorChannel.id,
            },
            {
              settings: JSON.stringify({
                ...rawSettings,
                shopify_access_token_online: accessToken,
                host,
                sessionId: id,
              }),
            }
          );
        }
      }
      return res.redirect(`/admin/?shop=${shop}&host=${host}`);
    }
    await this.shopsService.findOrCreate(
      vendureRequestContext as RequestContext,
      req,
      res,
      shop,
      accessToken as string
    );
    await this.webhookService.registerWebhooks(session);
    return res.redirect(`/api/online/auth?shop=${shop}`);
  }
}
