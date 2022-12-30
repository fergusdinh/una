import { PermissionDefinition } from '@vendure/core';
// Permission needs to be defined first
export const ReportsPermission = new PermissionDefinition({
  name: 'SetReports',
  description: 'Allows setting a reports URL',
});

export * from './reports.plugin';
export * from './types';
