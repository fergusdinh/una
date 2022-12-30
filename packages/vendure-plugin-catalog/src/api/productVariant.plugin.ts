import gql from 'graphql-tag';
import { PluginCommonModule, VendurePlugin } from '@vendure/core';
import { FieldOverrideProductVariantResolver } from './productVariant.resolver';
import { ProductVariantEntity } from './productVariant.entity';

import { schemaSearchResult } from './schema';

@VendurePlugin({
  imports: [PluginCommonModule],
  adminApiExtensions: {
    schema: schemaSearchResult,
    resolvers: [FieldOverrideProductVariantResolver],
  },
  entities: [ProductVariantEntity],
})
export class SearchProductVariantPlugin {}
