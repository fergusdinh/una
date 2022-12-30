import { PermissionDefinition } from '@vendure/core';
// Permission needs to be defined first
export const ReportsPermission = new PermissionDefinition({
  name: 'SetCatalog',
  description: 'Allows setting a reports URL',
});

export * from './catalog.plugin';
export * from './api';
