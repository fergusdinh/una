import { LanguageCode, CustomFields } from '@vendure/core';

export const ICustomFields: CustomFields['Product'] = [
  {
    name: 'metadata',
    type: 'text',
    length: 65535,
    label: [{ languageCode: LanguageCode.en, value: 'MetaData' }],
    ui: { component: 'metadata' },
    description: [
      {
        languageCode: LanguageCode.en,
        value:
          'Set this field if you want to use a specific metadata for product',
      },
    ],
  },
];
