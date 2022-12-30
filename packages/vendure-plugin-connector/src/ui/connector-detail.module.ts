import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  addNavMenuItem,
  SharedModule,
  registerFormInputComponent,
} from '@vendure/admin-ui/core';
import { JsonSchemaFormModule, FrameworkLibraryService } from '@ajsf/core';
import { FormsModule } from '@angular/forms';
import { ConnectorDetailComponent } from './connector-detail/connector-detail.component';
import { JsonEditorFormInputComponent } from './json-editor/json-editor.component';
import { connectorRouter } from './connector.router';

@NgModule({
  imports: [SharedModule, FormsModule, JsonSchemaFormModule],
  providers: [
    registerFormInputComponent(
      'json-editor-form-input',
      JsonEditorFormInputComponent
    ),
    FrameworkLibraryService,
  ],
  declarations: [ConnectorDetailComponent, JsonEditorFormInputComponent],
})
export class ConnectorDetailModule {}
