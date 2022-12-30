import { CustomFields } from '@vendure/core';

export const AssetFields: CustomFields['Asset'] = [
  {
    name: 'shopify_image_id',
    type: 'int',
    max: 10,
    unique: true,
    ui: { component: 'input-disable-form' },
  },
  {
    name: 'shopify_image_position',
    type: 'int',
    max: 10,
    unique: true,
    ui: { component: 'input-disable-form' },
  },
];
