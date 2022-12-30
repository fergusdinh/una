import { PermissionDefinition } from '@vendure/core';
// Permission needs to be defined first
export const HelpPermission = new PermissionDefinition({
  name: 'SetHelp',
  description: 'Allows setting a reports URL',
});

export * from './help.plugin';
export * from './gql';
export * from './api/schema';
export * from './ui/quoteRequestedHandler';
