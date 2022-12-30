import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import {
  PluginCommonModule,
  RuntimeVendureConfig,
  VendureConfig,
  VendurePlugin,
} from '@vendure/core';
import path from 'path';
import { CatalogPluginOptions } from './types';
import { ICustomFields } from './api/entities';

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  entities: [],
  configuration: (config: VendureConfig) => {
    if (process.env.JEST_WORKER_ID === undefined) {
      config.customFields!.Product!.push(...ICustomFields!);
    }
    return config as RuntimeVendureConfig;
  },
})
export class CatalogPlugin {
  static options: CatalogPluginOptions;

  static init(options: CatalogPluginOptions): typeof CatalogPlugin {
    this.options = options;
    return CatalogPlugin;
  }

  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [
      {
        type: 'lazy',
        route: 'catalog/products',
        ngModuleFileName: 'product-list-custom.module.ts',
        ngModuleName: 'ProductListCustomModule',
      },
      {
        type: 'lazy',
        route: 'catalog/products/settings',
        ngModuleFileName: 'settings.module.ts',
        ngModuleName: 'SettingsModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'catalog-shared.module.ts',
        ngModuleName: 'CatalogSharedModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'metadata.module.ts',
        ngModuleName: 'MetaDataModule',
      },
    ],
  };
}
