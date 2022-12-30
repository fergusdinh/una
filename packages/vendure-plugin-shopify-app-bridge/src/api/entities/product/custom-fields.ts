import { CustomFields } from '@vendure/core';

export const ProductFields: CustomFields['Product'] = [
  {
    name: 'shopify_product_id',
    type: 'string',
    ui: { component: 'input-disable-form' },
    length: 50,
  },
  {
    name: 'created_from',
    ui: { component: 'input-disable-form' },
    type: 'string',
    length: 100,
  },
  {
    name: 'updated_from',
    ui: { component: 'input-disable-form' },
    type: 'string',
    length: 100,
  },
  {
    name: 'created_by',
    ui: { component: 'input-disable-form' },
    type: 'string',
    length: 255,
  },
];
