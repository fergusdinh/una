import { CustomFields } from '@vendure/core';

export const ProductOptionGroupFields: CustomFields['ProductOptionGroup'] = [
  {
    name: 'shopify_product_option_group_id',
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
