import { ShopifyAuthModuleOptions } from '@nestjs-shopify/auth';
import { ConfigType, registerAs } from '@nestjs/config';
import { SHOPIFY_OFFLINE_BASE_PATH } from '../../constants';

export const getShopifyOfflineConfig = (): ShopifyAuthModuleOptions => ({
  basePath: SHOPIFY_OFFLINE_BASE_PATH,
  useGlobalPrefix: false,
});

export const shopifyOfflineConfig = registerAs(
  'shopifyOffline',
  getShopifyOfflineConfig
);

export type ShopifyOfflineConfig = ConfigType<typeof getShopifyOfflineConfig>;
