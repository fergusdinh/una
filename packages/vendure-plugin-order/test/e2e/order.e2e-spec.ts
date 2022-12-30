import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
} from '@vendure/testing';
import { initialData } from '../../../test/src/initial-data';
import { InitialData, mergeConfig } from '@vendure/core';
import { OrderPlugin } from '../../src';
import path from 'path';
import * as fs from 'fs';
import nock from 'nock';

jest.setTimeout(20000);

describe('Connector plugin', function () {
  const devConfig = mergeConfig(testConfig, {
    plugins: [
      OrderPlugin.init({
        disabled: false,
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
