import {
  AdministratorFields,
  ShopifyAppBridgePluginOptions,
  AddressFields,
  CustomerFields,
  SessionEntity,
} from './api';
import { Request } from 'express';
import {
  PluginCommonModule,
  VendurePlugin,
  VendureConfig,
  RuntimeVendureConfig,
} from '@vendure/core';
import { ConfigModule } from '@nestjs/config';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';
import { json } from 'body-parser';
import { ServerResponse } from 'http';
import { ShopifyAuthModule } from '@nestjs-shopify/auth';
import { ShopifyCoreModule } from '@nestjs-shopify/core';
import { ShopifyCoreConfigService } from './shopify/services/shopify-core-config.service';
import { AfterAuthModule } from './shopify/after-auth/after-auth.module';
import { WebhooksModule } from './shopify/webhook/webhooks.module';
import {
  ProductFields,
  AssetFields,
  ChannelFields,
  ProductOptionGroupFields,
  ProductOptionFields,
  ProductVariantFields,
} from './api';
import { SHOPIFY_WEBHOOK } from './constants';
import {
  shopifyOfflineConfig,
  shopifyOnlineConfig,
  shopifyCoreConfig,
} from './shopify/config';
import { ShopifyOfflineConfigService } from './shopify/services/shopify-offline-config.service';
import { ShopifyOnlineConfigService } from './shopify/services/shopify-online-config.service';
import { SessionModule } from './shopify/session/session.module';
import { ShopifyGraphqlProxyModule } from '@nestjs-shopify/graphql';
import { ShopifyAppBridgeController } from './api/shopify-app-bridge.controller';
import { ShopifyAuthSessionService } from '@nestjs-shopify/auth/src/auth-session.service';
@VendurePlugin({
  imports: [
    PluginCommonModule,
    ShopifyCoreModule.forRootAsync({
      imports: [ConfigModule.forFeature(shopifyCoreConfig), SessionModule],
      useClass: ShopifyCoreConfigService,
    }) as any,
    ShopifyAuthModule.forRootAsyncOffline({
      imports: [ConfigModule.forFeature(shopifyOfflineConfig), AfterAuthModule],
      useClass: ShopifyOfflineConfigService,
    }),
    ShopifyAuthModule.forRootAsyncOnline({
      imports: [ConfigModule.forFeature(shopifyOnlineConfig), AfterAuthModule],
      useClass: ShopifyOnlineConfigService,
    }),
    ShopifyGraphqlProxyModule,
    WebhooksModule,
  ],
  entities: [SessionEntity],
  controllers: [ShopifyAppBridgeController],
  providers: [ShopifyAuthSessionService],
  configuration: (config: VendureConfig) => {
    if (process.env.JEST_WORKER_ID === undefined) {
      config.customFields!.Administrator!.push(...AdministratorFields!);
      config.customFields!.Channel!.push(...ChannelFields!);
      config.customFields!.Product!.push(...ProductFields!);
      config.customFields!.Asset!.push(...AssetFields!);
      config.customFields!.ProductOptionGroup!.push(
        ...ProductOptionGroupFields!
      );
      config.customFields!.ProductOption!.push(...ProductOptionFields!);
      config.customFields!.ProductVariant!.push(...ProductVariantFields!);
      config.customFields!.Address!.push(...AddressFields!);
      config.customFields!.Customer!.push(...CustomerFields!);
    }
    config.apiOptions.middleware &&
      config.apiOptions.middleware.push({
        route: SHOPIFY_WEBHOOK,
        handler: rawBodyMiddleware,
        beforeListen: true,
      });
    return config as RuntimeVendureConfig;
  },
})
export class ShopifyAppBridgePlugin {
  static options: ShopifyAppBridgePluginOptions;

  static init(
    options: ShopifyAppBridgePluginOptions
  ): typeof ShopifyAppBridgePlugin {
    this.options = options;
    return ShopifyAppBridgePlugin;
  }

  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [],
  };
}

export interface RequestWithRawBody extends Request {
  rawBody: Buffer;
}

export const rawBodyMiddleware = json({
  verify(req: RequestWithRawBody, _: ServerResponse, buf: Buffer) {
    if (Buffer.isBuffer(buf)) {
      req.rawBody = Buffer.from(buf);
    }
    return true;
  },
});
