import { NgModule } from '@angular/core';
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core';

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection(
      {
        id: 'my-catalog',
        label: 'My Catalog',
        items: [
          {
            id: 'product-list-custom',
            label: 'All Products',
            routerLink: ['/extensions/catalog/products'],
            icon: 'shopping-bag',
          },
        ],
      },
      // Add this section before the "settings" section
      'settings'
    ),
  ],
  declarations: [],
})
export class CatalogSharedModule {}
