import { SassSubscriptionResolver } from './api/subscription.resolver';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';
import { SaasSubscriptionPluginOptions } from './api/subscription-options';
import { SubscriptionService } from './api/subscription.service';
import { schema } from './api/schema';
import { SubscriptionController } from './api/subscription.controller';

@VendurePlugin({
  imports: [PluginCommonModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
  adminApiExtensions: {
    schema,
    resolvers: [SassSubscriptionResolver],
  },
})
export class SubscriptionPlugin {
  static options: SaasSubscriptionPluginOptions;

  static init(
    options: SaasSubscriptionPluginOptions
  ): typeof SubscriptionPlugin {
    this.options = options;
    return SubscriptionPlugin;
  }
  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [],
  };
}
