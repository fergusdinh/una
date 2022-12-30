import { NgModule } from '@angular/core';
import {
  SharedModule,
  registerFormInputComponent,
} from '@vendure/admin-ui/core';
import { ToggleButtonFormInputComponent } from './toggle-button/toggle-button.component';

@NgModule({
  imports: [SharedModule],
  declarations: [ToggleButtonFormInputComponent],
  providers: [
    registerFormInputComponent(
      'toggle-button-form-input',
      ToggleButtonFormInputComponent
    ),
  ],
})
export class ToggleButtonModule {}
