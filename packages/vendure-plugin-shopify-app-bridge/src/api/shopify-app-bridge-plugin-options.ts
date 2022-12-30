import { ShopifyCoreOptions } from '@nestjs-shopify/core';
export interface ShopifyAppBridgePluginOptions
  extends Omit<ShopifyCoreOptions, 'sessionStorage'> {
  /**
   * Disable the plugin. Default is false
   */
  disabled?: boolean;
  /**
   * shop domain
   */
  shop?: string;
}
