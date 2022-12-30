import { VendureEvent, TransactionalConnection, Injector } from '@vendure/core';
export interface CatalogPluginOptions {
  /**
   * Disable the plugin. Default is false
   */
  disabled?: boolean;
}
