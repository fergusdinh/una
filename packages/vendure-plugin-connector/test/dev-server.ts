import {
  WoocommerceConnector,
  MagentoConnector,
  ShopifyConnector,
} from '@bavaan/vendure-plugin-connector/src/api/connectors';
import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
} from '@vendure/testing';
import {
  Collection,
  DefaultLogger,
  DefaultSearchPlugin,
  InitialData,
  LogLevel,
  Order,
  Product,
} from '@vendure/core';
import { initialData } from '../../test/src/initial-data';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { ConnectorPlugin } from '../src';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

(async () => {
  testConfig.logger = new DefaultLogger({ level: LogLevel.Debug });
  registerInitializer('sqljs', new SqljsInitializer('__data__'));
  testConfig.plugins.push(
    ConnectorPlugin.init({
      httpMethod: 'POST',
      delay: 3000,
      connectors: [
        new ShopifyConnector(),
        new MagentoConnector(),
        new WoocommerceConnector(),
      ],
      entities: [new Product(), new Order(), new Collection()],
      endpoint: 'https://headless-magento.bavaan.com/graphql',
    })
  );
  testConfig.plugins.push(DefaultSearchPlugin);
  testConfig.plugins.push(
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
      app: compileUiExtensions({
        outputPath: path.join(__dirname, '__admin-ui'),
        extensions: [ConnectorPlugin.ui],
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
