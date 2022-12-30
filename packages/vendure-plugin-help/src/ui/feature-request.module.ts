import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@vendure/admin-ui/core';

import { FormsModule } from '@angular/forms';

import { FeatureRequestComponent } from './feature-request/feature-request.component';
import { helpRouter } from './help.router';

@NgModule({
  imports: [SharedModule, RouterModule.forChild(helpRouter), FormsModule],
  declarations: [FeatureRequestComponent],
})
export class FeatureRequestModule {}
