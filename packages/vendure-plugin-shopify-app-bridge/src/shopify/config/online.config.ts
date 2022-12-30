import { ShopifyAuthModuleOptions } from '@nestjs-shopify/auth';
import { ConfigType, registerAs } from '@nestjs/config';
import { SHOPIFY_ONLINE_BASE_PATH } from '../../constants';

export const getShopifyOnlineConfig = (): ShopifyAuthModuleOptions => ({
  basePath: SHOPIFY_ONLINE_BASE_PATH,
  useGlobalPrefix: true,
  returnHeaders: true,
});

export const shopifyOnlineConfig = registerAs(
  'shopifyOnline',
  getShopifyOnlineConfig
);

export type ShopifyOnlineConfig = ConfigType<typeof getShopifyOnlineConfig>;
