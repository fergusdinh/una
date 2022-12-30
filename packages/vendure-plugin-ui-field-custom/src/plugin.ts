import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import path from 'path';

@VendurePlugin({
  imports: [PluginCommonModule],
})
export class CustomFieldUiPlugin {
  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [
      {
        type: 'shared',
        ngModuleFileName: 'country-select.module.ts',
        ngModuleName: 'CountrySelectModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'toggle-button.module.ts',
        ngModuleName: 'ToggleButtonModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'input-disable.module.ts',
        ngModuleName: 'InputDisableModule',
      },
    ],
  };
}
