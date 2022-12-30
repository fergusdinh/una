import { LanguageCode, CustomFields } from '@vendure/core';

export const AdministratorFields: CustomFields['Administrator'] = [
  {
    name: 'address',
    type: 'string',
    length: 255,
    label: [{ languageCode: LanguageCode.en, value: 'Address' }],
    description: [
      {
        languageCode: LanguageCode.en,
        value:
          'Set this field if you want to use a specific address for administrator',
      },
    ],
  },
  {
    name: 'active',
    type: 'boolean',
    defaultValue: false,
    nullable: false,
    label: [{ languageCode: LanguageCode.en, value: 'Active' }],
    ui: { component: 'toggle-button-form-input' },
    description: [
      {
        languageCode: LanguageCode.en,
        value: 'Set this field if you want to disable or active administrator',
      },
    ],
  },
  {
    name: 'external_id_lago',
    type: 'string',
    unique: true,
    ui: { component: 'input-disable-form' },
    label: [{ languageCode: LanguageCode.en, value: 'Lago Customer Id' }],
    description: [
      {
        languageCode: LanguageCode.en,
        value:
          'Set this field if you want to use a specific address for administrator',
      },
    ],
  },
];
