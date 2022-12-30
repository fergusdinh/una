import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { AdminUiExtension } from '@vendure/ui-devkit/compiler';
import path from 'path';
import { ReportsPluginOptions } from './types';

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
})
export class ReportsPlugin {
  static options: ReportsPluginOptions;

  static init(options: ReportsPluginOptions): typeof ReportsPlugin {
    this.options = options;
    return ReportsPlugin;
  }

  static ui: AdminUiExtension = {
    extensionPath: path.join(__dirname, 'ui'),
    ngModules: [
      {
        type: 'shared',
        ngModuleFileName: 'barChart.module.ts',
        ngModuleName: 'BarChartModule',
      },
      {
        type: 'shared',
        ngModuleFileName: 'lineChart.module.ts',
        ngModuleName: 'LineChartModule',
      },
      // {
      //   type: 'shared',
      //   ngModuleFileName: 'lineChart.module.ts',
      //   ngModuleName: 'LineChartWidgetModule',
      // }
    ],
  };
}
