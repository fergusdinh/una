import { CustomFields } from '@vendure/core';

export const ProductVariantFields: CustomFields['ProductVariant'] = [
  {
    name: 'shopify_product_variant_id',
    type: 'string',
    length: 50,
    ui: { component: 'input-disable-form' },
  },
  {
    name: 'shopify_product_id',
    type: 'string',
    length: 50,
    ui: { component: 'input-disable-form' },
  },
];
