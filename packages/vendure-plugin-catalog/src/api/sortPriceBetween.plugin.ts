import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { FieldOverrideSortResolver } from './sortPriceBetween.resolver';

import { schemaSortResult } from './schema';
import { SortPriceBetween } from './sortPriceBetween.entity';

@VendurePlugin({
  imports: [PluginCommonModule],
  adminApiExtensions: {
    schema: schemaSortResult,
    resolvers: [FieldOverrideSortResolver],
  },
  entities: [SortPriceBetween],
})
export class SortPlugin {}
