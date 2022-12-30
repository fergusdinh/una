import { Routes } from '@angular/router';
import { ConnectorDetailComponent } from './connector-detail/connector-detail.component';
import { ConnectorListComponent } from './connector-list/connector-list.component';

export const connectorRouter: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ConnectorListComponent,
    data: {
      breadcrumb: [
        {
          label: 'Store Connector',
          link: ['/extensions', 'connector'],
        },
      ],
    },
  },
  {
    path: ':type',
    component: ConnectorDetailComponent,
    data: { breadcrumb: channelBreadcrumb },
  },
];

export function channelBreadcrumb(data: any, params: any) {
  return [
    {
      label: 'Store Connector',
      link: ['/extensions', 'connector'],
    },
    {
      label: params.type.charAt(0).toUpperCase() + params.type.slice(1),
      link: ['/extensions', params.type],
    },
  ];
}
