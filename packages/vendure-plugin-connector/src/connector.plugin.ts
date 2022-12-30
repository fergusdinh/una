import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { CONNECTOR_OPTIONS, ENTITY_OPTIONS } from './constants';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { schema } from './api/schema';
import path from 'path';
import { ConnectorChannelEntity } from './api/entities/connector/connector-channel.entity';
import { ConnectorPluginOptions } from './api/connector-plugin-options';
import { ConnectorResolver } from './api/connector.resolver';
import { ConnectorService } from './api/connector.service';
import { connectorPermission } from './index';
import { IConnector } from './types';
import { CustomerFields } from './api/entities/customer/custom-fields';
export interface ExportConnectorConfig {
  connectors: IConnector[];
}

export interface ExportEntityConfig {
  entities: string[];
}

@VendurePlugin({
  imports: [PluginCommonModule],
  entities: [ConnectorChannelEntity],
  providers: [
    ConnectorService,
    {
      provide: CONNECTOR_OPTIONS,
      useFactory: () => ConnectorPlugin.options,
    },
    {
      provide: ENTITY_OPTIONS,
      useFactory: () => ConnectorPlugin.options,
    },
  ],
  adminApiExtensions: {
    schema,
    resolvers: [ConnectorResolver],
  },
  configuration: (config) => {
    if (process.env.JEST_WORKER_ID === undefined) {
      config.customFields!.Customer!.push(...CustomerFields!);
    }
    config.authOptions.customPermissions.push(connectorPermission);
    return config;
  },
})
export class ConnectorPlugin {
  static options: ConnectorPluginOptions;

  static init(options: ConnectorPluginOptions): typeof ConnectorPlugin {
    this.options = options;
    return ConnectorPlugin;
  }

  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [
      {
        type: 'lazy',
        route: 'connector',
        ngModuleFileName: 'connector-list.module.ts',
        ngModuleName: 'ConnectorListModule',
      },
      {
        type: 'lazy',
        route: ':type',
        ngModuleFileName: 'connector-detail.module.ts',
        ngModuleName: 'ConnectorDetailModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'connector-nav.module.ts',
        ngModuleName: 'ConnectorNavModule',
      },
    ],
  };
}
