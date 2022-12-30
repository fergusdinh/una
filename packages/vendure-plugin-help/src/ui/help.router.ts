import { Routes } from '@angular/router';
import { FeatureRequestComponent } from './feature-request/feature-request.component';

export const helpRouter: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FeatureRequestComponent,
    data: {
      breadcrumb: [
        {
          label: 'Feature Request',
          link: ['/extensions', 'help/feature-request'],
        },
      ],
    },
  },
];
