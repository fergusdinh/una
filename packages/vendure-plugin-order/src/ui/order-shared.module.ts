import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection(
      {
        id: 'my-order',
        label: 'My Sales',
        items: [
          {
            id: 'order-list-custom',
            label: 'Orders',
            routerLink: ['/extensions/sales/orders'],
            icon: 'shopping-cart',
          },
        ],
      },
      // Add this section before the "settings" section
      'settings'
    ),
  ],
})
export class OrderSharedModule {}
