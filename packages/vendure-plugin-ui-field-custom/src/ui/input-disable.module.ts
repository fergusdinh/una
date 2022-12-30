import { NgModule } from '@angular/core';
import {
  SharedModule,
  registerFormInputComponent,
} from '@vendure/admin-ui/core';
import { InputDisableComponent } from './input-disable/input-disable.component';

@NgModule({
  imports: [SharedModule],
  declarations: [InputDisableComponent],
  providers: [
    registerFormInputComponent('input-disable-form', InputDisableComponent),
  ],
})
export class InputDisableModule {}
