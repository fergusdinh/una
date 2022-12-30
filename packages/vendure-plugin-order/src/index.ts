import { PermissionDefinition } from '@vendure/core';
// Permission needs to be defined first
export const HelpPermission = new PermissionDefinition({
  name: 'SetOrder',
  description: 'Allows setting a reports URL',
});

export * from './order.plugin';
