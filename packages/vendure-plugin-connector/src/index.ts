import { PermissionDefinition } from '@vendure/core';
// Permission needs to be defined first
export const connectorPermission = new PermissionDefinition({
  name: 'SetConnector',
  description: 'Allows setting a connector URL',
});

export * from './connector.plugin';
export * from './api';
