import { LanguageCode, CustomFields } from '@vendure/core';

export const ChannelFields: CustomFields['Channel'] = [
  {
    name: 'shopify_domain',
    type: 'string',
    length: 255,
    label: [{ languageCode: LanguageCode.en, value: 'Shopify Domain' }],
    ui: { component: 'input-disable-form' },
    description: [
      {
        languageCode: LanguageCode.en,
        value: 'Shopify Domain',
      },
    ],
  },
];
