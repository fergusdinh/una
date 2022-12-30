import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { CubejsClient } from '@cubejs-client/ngx';
import { formatDate, registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localeEn);

@Component({
  selector: 'total-order-chart',
  templateUrl: '../.././TemplateChart/chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // styleUrls: ["./bar-chart.component.scss"]
})
export class TotalOrderComponent implements OnInit {
  @Input() query: Object | any;

  constructor(private cubejs: CubejsClient, private cdr: ChangeDetectorRef) {}

  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cornerRadius: 50,
    tooltips: {
      enabled: true,
      intersect: false,
    },
    layout: { padding: 0 },
    scales: {
      x: [
        {
          barThickness: 10,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: '#A1A1B5',
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      y: [
        {
          ticks: {
            fontColor: '#A1A1B5',
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: '#eeeeee',
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: '#eeeeee',
          },
        },
      ],
    },
  };

  public barChartLabels: Array<any> = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData: Array<any> = [];

  ngOnInit() {
    this.cubejs.load(this.query).subscribe(
      (resultSet) => {
        const COLORS_SERIES = ['#FF6492'];
        this.barChartLabels = resultSet
          .chartPivot()
          .map((c) => formatDate(c.x, 'LLL dd', 'en'));
        this.barChartData = resultSet.series().map((s, index) => ({
          label: s.title,
          data: s.series.map((r) => r.value),
          backgroundColor: COLORS_SERIES[0],
          fill: false,
        }));

        this.cdr.markForCheck();
      },
      (err) => console.log('HTTP Error', err)
    );
  }
}
