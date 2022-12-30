import { FeatureRequestResolver } from './gql/feature-request.resolver';
import { FeatureRequestEntity } from './gql/feature-request.entity';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';

import path from 'path';
import { schemaExtensions } from './api/schema';
import { FeatureRequestService } from './ui/feature-request.service';
import { HelpPluginOptions } from './types';

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [FeatureRequestService],
  adminApiExtensions: {
    schema: schemaExtensions,
    resolvers: [FeatureRequestResolver],
  },
  entities: [FeatureRequestEntity],
})
export class HelpPlugin {
  static options: HelpPluginOptions;

  static init(options: HelpPluginOptions): typeof HelpPlugin {
    this.options = options;
    return HelpPlugin;
  }

  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [
      {
        type: 'lazy',
        route: 'help/feature-request',
        ngModuleFileName: 'feature-request.module.ts',
        ngModuleName: 'FeatureRequestModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'help-shared.module.ts',
        ngModuleName: 'HelpSharedModule',
      },
    ],
  };
}
