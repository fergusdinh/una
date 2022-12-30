import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
} from '@vendure/testing';
import {
  ChannelService,
  Collection,
  DefaultLogger,
  EventBus,
  InitialData,
  LogLevel,
  mergeConfig,
  Product,
  Order,
  ProductEvent,
  RequestContext,
} from '@vendure/core';
import { initialData } from '../../../test/src/initial-data';
import { ConnectorPlugin } from '../../src';
import {
  WoocommerceConnector,
  MagentoConnector,
  ShopifyConnector,
} from '../../src/api/connectors';
import { ConnectorService } from '../../src/api/connector.service';
import { ConnectorPerChannelEntity } from '../../src/api/entities/connector/connector-per-channel.entity';
import path from 'path';
import * as fs from 'fs';
import nock from 'nock';

jest.setTimeout(20000);

describe('Test Connector plugin', function () {
  const devConfig = mergeConfig(testConfig, {
    plugins: [
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
      }),
    ],
  });
  let serverStarted = false;
  let serverPort: number;
  const { shopClient, adminClient, server } = createTestEnvironment(devConfig);
  beforeAll(async () => {
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    serverPort = devConfig.apiOptions.port;
    await server.init({
      initialData: initialData as InitialData,
      productsCsvPath: path.join(__dirname, 'fixtures/products-import.csv'),
      customerCount: 2,
    });
    serverStarted = true;
  }, 60000);

  it('Should start successfully', async () => {
    await expect(serverStarted).toBe(true);
  });

  it('Should saved connector', async () => {
    const connector = await server.app
      .get(ConnectorService)
      .saveConnector(
        '1',
        '{"consumer_key":"ck_f012ab960a3e39b2c959c51e7275adc8fa403922","consumer_secret":" cs_54b6bb351df5889849aa0c4adfe1f6ddaad0524a","url":"https://woocommerce-wordpress.odoosuite.co","version":"wc/v3","events":["ProductEvent","ProductVariantChannelEvent","AccountRegistrationEvent","ProductVariantEvent","ZoneEvent","OrderEvent","OrderLineEvent","OrderPlacedEvent","OrderStateTransitionEvent"]}',
        'shopify'
      );
    await expect(connector).toBeInstanceOf(ConnectorPerChannelEntity);
  });

  afterAll(async () => {
    await server.destroy();
  });
});
