import { CustomFields } from '@vendure/core';

export const AddressFields: CustomFields['Address'] = [
  {
    name: 'shopify_customer_id',
    type: 'string',
    length: 255,
    ui: { component: 'input-disable-form' },
  },
  {
    name: 'shopify_address_id',
    type: 'string',
    length: 255,
    ui: { component: 'input-disable-form' },
  },
];
