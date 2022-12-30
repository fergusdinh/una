import { LanguageCode, CustomFields } from '@vendure/core';

export const CustomerFields: CustomFields['Customer'] = [
  {
    name: 'country_select',
    type: 'string',
    nullable: false,
    defaultValue: '',
    label: [{ languageCode: LanguageCode.en, value: 'Country' }],
    ui: { component: 'vdr-country-select' },
    description: [
      {
        languageCode: LanguageCode.en,
        value: 'Choose country code for phone number',
      },
    ],
  },
];
