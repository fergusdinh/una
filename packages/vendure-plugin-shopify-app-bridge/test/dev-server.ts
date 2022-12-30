import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
} from '@vendure/testing';
import {
  CollectionModificationEvent,
  DefaultLogger,
  DefaultSearchPlugin,
  InitialData,
  LogLevel,
  ProductEvent,
  ProductVariantChannelEvent,
  ProductVariantEvent,
} from '@vendure/core';
import { initialData } from '../../test/src/initial-data';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { ShopifyAppBridgePlugin } from '../src';
import { ApiVersion } from '@shopify/shopify-api';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

(async () => {
  testConfig.logger = new DefaultLogger({ level: LogLevel.Debug });
  registerInitializer('sqljs', new SqljsInitializer('__data__'));
  testConfig.plugins.push(
    ShopifyAppBridgePlugin.init({
      apiKey: process.env.SHOPIFY_API_KEY,
      apiSecret: process.env.SHOPIFY_API_SECRET,
      apiVersion: ApiVersion.April22,
      hostName: process.env.HOST.replace(/https?:\/\//, ''),
      isEmbeddedApp: true,
      scopes: ['read_products', 'write_products'],
    })
  );
  testConfig.plugins.push(DefaultSearchPlugin);
  testConfig.plugins.push(
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
      app: compileUiExtensions({
        outputPath: path.join(__dirname, '__admin-ui'),
        extensions: [ShopifyAppBridgePlugin.ui],
        devMode: true,
      }),
    })
  );
  testConfig.apiOptions.shopApiPlayground = {};
  testConfig.apiOptions.adminApiPlayground = {};
  const { server } = createTestEnvironment(testConfig);
  await server.init({
    initialData: initialData as InitialData,
    productsCsvPath: '../../test/src/products-import.csv',
  });
})();
