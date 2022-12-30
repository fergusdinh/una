import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Meta, Title } from '@angular/platform-browser';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'wrapperChart-widget',
  templateUrl: './wrapperChart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./wrapperChart.component.scss'],
})
export class WrapperChartComponent implements OnInit {
  cols: any;
  chartCols: any;

  gridByBreakpoint = {
    xl: 4,
    lg: 4,
    md: 2,
    sm: 2,
    xs: 1,
  };
  chartGridByBreakpoint = {
    xl: 5,
    lg: 5,
    md: 3,
    sm: 3,
    xs: 3,
  };
  doughnutCols = 2;
  constructor(
    private meta: Meta,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
    this.meta.addTag({
      name: 'description',
      content: 'How to build Angular Material Dashboard with Cube.js',
    });
    this.meta.addTag({
      name: 'keywords',
      content: 'Angular, Cube.js, Dashboard, Material UI',
    });

    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .subscribe((result) => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.cols = this.gridByBreakpoint.xs;
            this.chartCols = this.chartGridByBreakpoint.xs;
            this.doughnutCols = 3;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
            this.chartCols = this.chartGridByBreakpoint.sm;
            this.doughnutCols = 3;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
            this.chartCols = this.chartGridByBreakpoint.md;
            this.doughnutCols = 3;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.gridByBreakpoint.lg;
            this.chartCols = this.chartGridByBreakpoint.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.gridByBreakpoint.xl;
            this.chartCols = this.chartGridByBreakpoint.xl;
          }
        }
      });
  }

  private query = new BehaviorSubject({
    timeDimensions: [
      {
        dimension: 'Orders.createdAt',
        granularity: 'month',
        dateRange: 'This year',
      },
    ],
    dimensions: ['Orders.createdAt'],
    measures: ['Orders.sumSubTotal'],
    // filters: [{ dimension: "order.status", operator: "notEquals", values: ["completed"] }]
  });

  changeDateRange = (value: any) => {
    this.query.next({
      ...this.query.value,
      timeDimensions: [
        {
          dimension: 'Orders.createdAt',
          granularity: 'month',
          dateRange: value,
        },
      ],
    });
  };

  public cards: any = [];
  public KPICards = [];
  // public KPICards = [
  //   {
  //     title: 'ORDER',
  //     query: { measures: ['order.total'] },
  //     difference: 'order',
  //     progress: false,
  //     duration: 2.25,
  //   },
  //   {
  //     title: 'TOTAL USERS',
  //     query: { measures: ['Users.count'] },
  //     difference: 'Users',
  //     progress: false,
  //     duration: 2.5,
  //   },
  //   {
  //     title: 'COMPLETED ORDERS',
  //     query: { measures: ['Orders.percentOfCompletedOrders'] },
  //     difference: false,
  //     progress: true,
  //     duration: 2.75,
  //   },
  //   {
  //     title: 'TOTAL PROFIT',
  //     query: { measures: ['order_item.createdAt'] },
  //     difference: false,
  //     progress: false,
  //     duration: 3.25,
  //   },
  // ];

  ngOnInit() {
    this.query.subscribe((data) => {
      this.cards[0] = {
        hasDatePick: true,
        title: 'Sales Over Time',
        chart: 'line',
        cols: 3,
        rows: 1,
        query: data,
      };
    });

    this.cdr.markForCheck();
  }
}
