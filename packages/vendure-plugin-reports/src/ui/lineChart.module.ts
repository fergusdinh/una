import { ChartsModule } from 'ng2-charts';
import {
  SharedModule,
  registerDashboardWidget,
  setDashboardWidgetLayout,
} from '@vendure/admin-ui/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { CubejsClientModule } from '@cubejs-client/ngx';

import { MatCardModule } from '@angular/material/card';
import { BarChartComponent } from './components/SubTotalChart/LineChart/lineChart.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LayoutModule } from '@angular/cdk/layout';
import { CountUpModule } from 'ngx-countup';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { WrapperChartComponent } from './components/SubTotalChart/WrapperChart/wrapperChart.component';
import { MatIconRegistry } from '@angular/material/icon';

const cubejsOptions = {
  token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2Mjc0NjM2MDZ9.1boj2JrVcsxVkbQsZxuOP21VDxNQyHpxrh3go45k9pc',
  options: { apiUrl: `http://localhost:9000/cube/cubejs-api/v1` },
};

@NgModule({
  declarations: [BarChartComponent, WrapperChartComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    ChartsModule,
    MatIconModule,
    CubejsClientModule.forRoot(cubejsOptions),
    MatCardModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressBarModule,
    LayoutModule,
    MatListModule,
    MatPaginatorModule,
    CountUpModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [
    registerDashboardWidget('app-line-chart', {
      title: 'Sub Total',
      supportedWidths: [4, 6, 8, 12],
      loadComponent: () =>
        import(
          './components/SubTotalChart/WrapperChart/wrapperChart.component'
        ).then((m) => m.WrapperChartComponent),
    }),
    setDashboardWidgetLayout([
      { id: 'welcome', width: 12 },
      { id: 'total-order-chart', width: 6 },
      { id: 'app-line-chart', width: 6 },
    ]),
  ],
  bootstrap: [WrapperChartComponent],
})
export class LineChartModule {}
