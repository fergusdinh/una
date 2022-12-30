import { ProductListCustomComponent } from './custom-components/product-list-custom/product-list-custom.component';
import { SettingsComponent } from './custom-components/settings/settings.component';
import { Routes } from '@angular/router';

export const catalogRouter: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ProductListCustomComponent,
    data: {
      breadcrumb: [
        {
          label: 'Product',
          link: ['/extensions', 'catalog/products'],
        },
      ],
    },
  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      breadcrumb: [
        {
          label: 'Product',
          link: ['/extensions/catalog/products'],
        },
        {
          label: 'Setting',
          link: ['/extensions/catalog/products', '/settings'],
        },
      ],
    },
  },
];
