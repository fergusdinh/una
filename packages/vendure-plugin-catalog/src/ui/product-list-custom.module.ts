import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SharedModule } from '@vendure/admin-ui/core';

import { ClarityModule } from '@clr/angular';
import { ProductListCustomComponent } from './custom-components/product-list-custom/product-list-custom.component';
import { MoreFilters } from './custom-components/more-filters/more-filters.component';
import { catalogRouter } from './catalog.router';

@NgModule({
  imports: [SharedModule, ClarityModule, RouterModule.forChild(catalogRouter)],

  declarations: [ProductListCustomComponent, MoreFilters],
})
export class ProductListCustomModule {}
