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
  constructor(
    private meta: Meta,
    private title: Title,
    private breakpointObserver: BreakpointObserver,
    private cdr: ChangeDetectorRef
  ) {
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
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.gridByBreakpoint.sm;
            this.chartCols = this.chartGridByBreakpoint.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.gridByBreakpoint.md;
            this.chartCols = this.chartGridByBreakpoint.md;
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
    measures: ['CountOrders.countOrder'],
    dimensions: ['CountOrders.createdAt'],
    timeDimensions: [
      {
        dimension: 'CountOrders.createdAt',
        granularity: 'month',
        dateRange: 'This year',
      },
    ],
    filters: [],
    // dimensions: ['order.status'],
  });
  changeDateRange = (value: any) => {
    this.query.next({
      ...this.query.value,
      timeDimensions: [
        {
          dimension: 'CountOrders.createdAt',
          granularity: 'month',
          dateRange: value,
        },
      ],
    });
  };

  public cards: any = [];

  ngOnInit() {
    this.query.subscribe((data) => {
      this.cards[0] = {
        hasDatePick: true,
        title: 'Total Order',
        chart: 'bar',
        cols: 3,
        rows: 1,
        query: data,
      };
    });

    this.cdr.markForCheck();
  }
}
