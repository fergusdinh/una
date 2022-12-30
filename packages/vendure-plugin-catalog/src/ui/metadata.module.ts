import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import {
  SharedModule,
  registerFormInputComponent,
} from '@vendure/admin-ui/core';
import { MetaDataComponent } from './metadata/metadata.component';

import { JsonSchemaFormModule } from '@ajsf/core';
@NgModule({
  imports: [SharedModule, FormsModule, JsonSchemaFormModule],
  declarations: [MetaDataComponent],
  providers: [registerFormInputComponent('metadata', MetaDataComponent)],
})
export class MetaDataModule {}
