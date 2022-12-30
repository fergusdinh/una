import { ShopifyCoreOptions } from '@nestjs-shopify/core';
import { Logger } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import { ApiVersion, LogSeverity } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2022-10';

const logger = new Logger('Shopify');

export const getShopifyCoreConfig = (): Omit<
  ShopifyCoreOptions,
  'sessionStorage'
> => ({
  apiKey: '',
  apiSecretKey: '',
  apiVersion: ApiVersion.October22,
  hostName: '',
  isEmbeddedApp: true,
  scopes: ['write_products'],
  hostScheme: 'https',
  isPrivateApp: false,
  restResources,
  logger: {
    httpRequests: false,
    level:
      process.env.NODE_ENV !== 'production'
        ? LogSeverity.Debug
        : LogSeverity.Info,
    log: async (_severity, msg) => logger.log(msg),
    timestamps: false,
  },
});

export const shopifyCoreConfig = registerAs(
  'shopifyCore',
  getShopifyCoreConfig
);

export type ShopifyCoreConfig = ConfigType<typeof getShopifyCoreConfig>;
