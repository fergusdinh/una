import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';

import path from 'path';

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  adminApiExtensions: {},
  entities: [],
})
export class OrderPlugin {
  static options: any;

  static init(options: any): typeof OrderPlugin {
    this.options = options;
    return OrderPlugin;
  }

  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [
      {
        type: 'lazy',
        route: 'sales/orders',
        ngModuleFileName: 'order-list.module.ts',
        ngModuleName: 'OrderListModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'order-shared.module.ts',
        ngModuleName: 'OrderSharedModule',
      },
    ],
  };
}
