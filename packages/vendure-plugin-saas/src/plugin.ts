import { SubscriptionPlugin } from '@bavaan/vendure-plugin-subscription';
import {
  PluginCommonModule,
  VendurePlugin,
  VendureConfig,
  RuntimeVendureConfig,
} from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { AdministratorFields } from './api/entities/administrator/custom-fields';
import { SaasPluginOptions } from './api/saas-plugin-options';
import path from 'path';
import { SassService } from './api/sass.service';
import { schema } from './api/schema';
import { SassResolver } from './api/sass.resolver';

@VendurePlugin({
  imports: [PluginCommonModule, SubscriptionPlugin],
  providers: [SassService],
  adminApiExtensions: {
    schema,
    resolvers: [SassResolver],
  },
  configuration: (config: VendureConfig) => {
    if (process.env.JEST_WORKER_ID === undefined) {
      config.customFields!.Administrator!.push(...AdministratorFields!);
    }
    return config as RuntimeVendureConfig;
  },
})
export class SaasPlugin {
  static options: SaasPluginOptions;

  static init(options: SaasPluginOptions): typeof SaasPlugin {
    this.options = options;
    return SaasPlugin;
  }
}
