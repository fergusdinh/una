import { NgModule } from '@angular/core';
import {
  SharedModule,
  registerFormInputComponent,
} from '@vendure/admin-ui/core';
import { CountrySelectComponent } from './country-select/country-select.component';

@NgModule({
  imports: [SharedModule],
  declarations: [CountrySelectComponent],
  providers: [
    registerFormInputComponent('vdr-country-select', CountrySelectComponent),
  ],
})
export class CountrySelectModule {}
