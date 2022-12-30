import { PermissionDefinition } from '@vendure/core';
// Permission needs to be defined first
export const shopifyAppBridgePermission = new PermissionDefinition({
  name: 'SetShopifyAppBridge',
  description: 'Allows setting a Store Connector URL',
});

export * from './plugin';
export * from './api';
export * from './constants';
