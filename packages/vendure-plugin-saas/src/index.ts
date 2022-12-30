import { PermissionDefinition } from '@vendure/core';
// Permission needs to be defined first
export const saasPermission = new PermissionDefinition({
  name: 'SetSaas',
  description: 'Allows setting a Store Connector URL',
});

export * from './plugin';
export * from './api';
