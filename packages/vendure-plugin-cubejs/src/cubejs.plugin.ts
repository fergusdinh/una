import { Type } from '@vendure/common/lib/shared-types';
import { MiddlewareConsumer } from '@nestjs/common';
import {
  ConfigService,
  createProxyHandler,
  PluginCommonModule,
  ProcessContext,
  registerPluginStartupMessage,
  RuntimeVendureConfig,
  VendurePlugin,
} from '@vendure/core';
import { CubejsServer } from '@cubejs-backend/server';
import { DatabaseType } from '@cubejs-backend/server-core/dist/src/core/types';

export interface CubeJsPluginOptions {
  route: string;
  port: number;
}

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  configuration: (config) => CubeJsPlugin.configure(config),
})
export class CubeJsPlugin {
  constructor(
    private processContext: ProcessContext,
    private configService: ConfigService
  ) {}

  private static options: CubeJsPluginOptions;

  static init(options: CubeJsPluginOptions): Type<CubeJsPlugin> {
    CubeJsPlugin.options = options;
    return this;
  }

  static async configure(config: RuntimeVendureConfig) {
    return config;
  }

  async configure(consumer: MiddlewareConsumer) {
    const { port, route } = CubeJsPlugin.options;
    if (this.processContext.isWorker) {
      return;
    }
    consumer.apply(await this.createCubeJsServer()).forRoutes(route);
    consumer
      .apply(
        createProxyHandler({
          port,
          route,
          label: 'Cube',
          basePath: '/',
        })
      )
      .forRoutes(route);
    registerPluginStartupMessage('Cube server', route);
  }
  /**
   * Creates the cube server
   */
  private async createCubeJsServer(): Promise<any> {
    const connectionOptionsSqlAvaiable: string[] = ['sqljs', 'better-sqlite3'];
    let typeConnection: DatabaseType = 'postgres';
    connectionOptionsSqlAvaiable.forEach((connect) => {
      if (connect === this.configService.dbConnectionOptions.type) {
        typeConnection = 'sqlite';
      } else {
        typeConnection = this.configService.dbConnectionOptions
          .type as DatabaseType;
      }
    });
    const serverCubeJs = new CubejsServer({
      driverFactory: () => {
        return {
          type: typeConnection,
          database: this.configService.dbConnectionOptions.database,
        };
      },
    });
    serverCubeJs
      .listen()
      .then(({ version, port }) => {
        // console.log(`Version: ${version}, Port: ${port}`);
      })
      .catch((e) => {
        // console.error('Fatal error during server start: ');
        // console.error(e.stack || e);
      });
    return serverCubeJs;
  }
}
