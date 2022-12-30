import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addNavMenuItem, SharedModule } from '@vendure/admin-ui/core';
import { JsonSchemaFormModule, FrameworkLibraryService } from '@ajsf/core';
import { FormsModule } from '@angular/forms';
import { ConnectorListComponent } from './connector-list/connector-list.component';
import { connectorRouter } from './connector.router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(connectorRouter),
    FormsModule,
    JsonSchemaFormModule,
  ],
  providers: [
    addNavMenuItem(
      {
        id: 'connector',
        label: 'Store Connector',
        routerLink: ['/extensions/connector'],
        icon: 'cursor-hand-open',
      },
      'settings'
    ),
    FrameworkLibraryService,
  ],
  declarations: [ConnectorListComponent],
})
export class ConnectorListModule {}
