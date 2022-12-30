import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';

import { ProductListCustomComponent } from './custom-components/product-list-custom/product-list-custom.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ProductListCustomComponent],
})
export class CatalogModule {}
