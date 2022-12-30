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
import { SaasPlugin } from '../src';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

(async () => {
  testConfig.logger = new DefaultLogger({ level: LogLevel.Debug });
  registerInitializer('sqljs', new SqljsInitializer('__data__'));
  testConfig.plugins.push(SaasPlugin.init({}));
  testConfig.plugins.push(DefaultSearchPlugin);
  testConfig.plugins.push(
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
      app: compileUiExtensions({
        outputPath: path.join(__dirname, '__admin-ui'),
        extensions: [SaasPlugin.ui],
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
