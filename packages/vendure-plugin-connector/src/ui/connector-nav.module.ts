import { NgModule } from '@angular/core';
import { addNavMenuSection, SharedModule } from '@vendure/admin-ui/core';

/**
 * This module adds the connector-sections to existing nav
 */
@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection(
      {
        id: 'my-connector',
        label: 'My Connector',
        items: [
          {
            id: 'connector',
            label: 'Connector',
            routerLink: ['/extensions/connector'],
            icon: 'cloud-traffic',
          },
        ],
        requiresPermission(userPermissions) {
          if (userPermissions.includes('SetConnector')) {
            return true;
          }
          return false;
        },
      },
      // Add this section before the "settings" section
      'settings'
    ),
  ],
})
export class ConnectorNavModule {}
