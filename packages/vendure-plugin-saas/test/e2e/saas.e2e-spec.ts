import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
} from '@vendure/testing';
import { initialData } from '../../../test/src/initial-data';
import { InitialData, mergeConfig } from '@vendure/core';
import { SaasPlugin } from '../../src';
import { SubscriptionPlugin } from '@bavaan/vendure-plugin-subscription';
import path from 'path';
import * as fs from 'fs';
import nock from 'nock';

jest.setTimeout(20000);

describe('Test Report plugin', function () {
  const devConfig = mergeConfig(testConfig, {
    plugins: [
      SubscriptionPlugin.init({
        baseUrl: 'https://testing',
        apiKey: 'xxxxxxxxxxx',
        apiPath: '/api',
        email: 'test@gmail.com',
        password: 'xxxxxxxxxxxxxx',
        disabled: false,
      }),
      SaasPlugin.init({
        disabled: false,
      }),
    ],
  });
  const mockData = {
    host: 'https://my-vendure.io',
    redirectUrl: 'https://my-storefront/order',
    apiKey: 'myApiKey',
    lagoLoginResponse: {
      data: {
        me: {
          id: '09f43c01-b457-4ef1-a1e4-73ed9072977f',
          email: 'info@bavaan.com',
          organizations: [
            {
              id: 'b4fdb6e2-b772-4910-983f-a98bec93c910',
              name: 'Bavaan',
              logoUrl: null,
              apiKey: '30b4a34e-f311-4245-908a-4df46c4f62a5',
              __typename: 'Organization',
              vatRate: 0.0,
            },
          ],
          __typename: 'User',
        },
      },
    },
    lagoWebhookTokenResponse: 'xxxxxxxxxxxxxxxx',
  };
  let serverStarted = false;
  let serverPort: number;
  const { shopClient, adminClient, server } = createTestEnvironment(devConfig);
  beforeAll(async () => {
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    nock('https://testing')
      .persist()
      .post('/graphql')
      .reply(200, mockData.lagoLoginResponse);
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
