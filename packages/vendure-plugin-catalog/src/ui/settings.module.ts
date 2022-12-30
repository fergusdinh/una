import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';

import { SettingsComponent } from './custom-components/settings/settings.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SettingsComponent],
})
export class SettingsModule {}
