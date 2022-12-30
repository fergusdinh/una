import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';
import { ClarityModule } from '@clr/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { OrderListCustomComponent } from './order-list-custom/order-list-custom.component';
import { OrderFilterComponent } from './order-filter/order-filter.component';
import { FilterAdvancedComponent } from './filter-advanced/filter-advanced.component';

@NgModule({
  imports: [
    SharedModule,
    ClarityModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: OrderListCustomComponent,
        data: {
          breadcrumb: [
            {
              label: 'Orders',
              link: ['/extensions', 'sales/orders'],
            },
          ],
        },
      },
    ]),
  ],
  declarations: [
    OrderListCustomComponent,
    OrderFilterComponent,
    FilterAdvancedComponent,
  ],
})
export class OrderListModule {}
