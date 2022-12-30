import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
} from '@vendure/testing';
import { initialData } from '../../../test/src/initial-data';
import { InitialData, mergeConfig } from '@vendure/core';
import { ShopifyAppBridgePlugin } from '../../src';
import { ApiVersion } from '@shopify/shopify-api';
import path from 'path';
import * as fs from 'fs';
import nock from 'nock';

jest.setTimeout(20000);

describe('Test ShopifyAppBridgePlugin', function () {
  process.env.SHOPIFY_API_KEY = '53e08f9ae1c80ce941134c1a389f8ea9';
  process.env.SHOPIFY_API_SECRET = 'af3b77c93242b993fce98cadac923f10';
  process.env.HOST = 'bavaan-omnichannel-app.loca.lt';
  const devConfig = mergeConfig(testConfig, {
    plugins: [
      ShopifyAppBridgePlugin.init({
        apiKey: process.env.SHOPIFY_API_KEY,
        apiSecret: process.env.SHOPIFY_API_SECRET,
        apiVersion: ApiVersion.April22,
        hostName: process.env.HOST.replace(/https?:\/\//, ''),
        isEmbeddedApp: true,
        scopes: ['read_products', 'write_products'],
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

  afterAll(async () => {
    await server.destroy();
  });
});
