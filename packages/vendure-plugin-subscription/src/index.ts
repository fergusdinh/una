import { PermissionDefinition } from '@vendure/core';
// Permission needs to be defined first
export const saasSubscriptionPermission = new PermissionDefinition({
  name: 'SetSaasSubscription',
  description: 'Allows setting a Store Connector URL',
});

export * from './plugin';
export * from './api';
