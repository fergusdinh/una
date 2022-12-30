import {
  createTestEnvironment,
  registerInitializer,
  SqljsInitializer,
  testConfig,
  SimpleGraphQLClient,
} from '@vendure/testing';
import { initialData } from '../../../test/src/initial-data';
import {
  ChannelService,
  DefaultLogger,
  EventBus,
  InitialData,
  LogLevel,
  mergeConfig,
  ProductEvent,
  RequestContext,
} from '@vendure/core';
import { CubeJsPlugin } from '../../src';
import { TestServer } from '@vendure/testing/lib/test-server';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import path from 'path';
import * as fs from 'fs';
import nock from 'nock';

jest.setTimeout(20000);

describe('Connector plugin', function () {
  let server: TestServer;
  let serverStarted = false;
  let ctx: RequestContext;
  let client: SimpleGraphQLClient;

  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = { ...OLD_ENV }; // Make a copy
  });

  beforeAll(async () => {
    registerInitializer('sqljs', new SqljsInitializer('__data__'));
    const config = mergeConfig(testConfig, {
      apiOptions: {
        port: 3102,
      },
      logger: new DefaultLogger({ level: LogLevel.Debug }),
      plugins: [
        CubeJsPlugin.init({
          route: 'cube',
          port: 3333,
        }),
      ],
    });

    ({ server } = createTestEnvironment(config));
    await server.init({
      initialData: initialData as InitialData,
      productsCsvPath: '../../test/src/products-import.csv',
    });
    serverStarted = true;
    ctx = new RequestContext({
      apiType: 'admin',
      channel: await server.app.get(ChannelService).getDefaultChannel(),
      isAuthorized: true,
      authorizedAsOwnerOnly: false,
    });
  }, 60000);

  it('Should start successfully', async () => {
    await expect(serverStarted).toBe(true);
  });

  // it.skip('Should compile admin', async () => {
  //   // @ts-ignore: Unreachable code error
  //   fs.rmSync(path.join(__dirname, '__admin-ui'), {
  //     recursive: true,
  //     force: true,
  //   });
  //   await compileUiExtensions({
  //     outputPath: path.join(__dirname, '__admin-ui'),
  //     extensions: [CubeJsPlugin.ui],
  //   }).compile?.();
  //   const files = fs.readdirSync(path.join(__dirname, '__admin-ui/dist'));
  //   expect(files?.length).toBeGreaterThan(0);
  // }, 240000);

  afterAll(() => {
    process.env = OLD_ENV;
    return server.destroy();
  });
});
