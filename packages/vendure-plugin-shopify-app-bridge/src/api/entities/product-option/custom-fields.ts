import { CustomFields } from '@vendure/core';

export const ProductOptionFields: CustomFields['ProductOption'] = [
  {
    name: 'shopify_product_option_group_id',
    type: 'string',
    length: 50,
    ui: { component: 'input-disable-form' },
  },
  {
    name: 'shopify_product_id',
    type: 'string',
    ui: { component: 'input-disable-form' },
    length: 50,
  },
];
