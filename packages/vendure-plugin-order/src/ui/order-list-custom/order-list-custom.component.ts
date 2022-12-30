import { OrderListComponent } from '@vendure/admin-ui/order';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {
  DataService,
  NotificationService,
  LocalStorageService,
  ServerConfigService,
  LogicalOperator,
  SortOrder,
  OrderListOptions,
} from '@vendure/admin-ui/core';

import '@cds/core/icon/register.js';
import {
  ClarityIcons,
  downloadIcon,
  uploadIcon,
  sortByIcon,
} from '@cds/core/icon';

import { getOrders } from '../queries';

import { Order } from '@vendure/common/lib/generated-types';

@Component({
  selector: 'order-list-custom',
  styleUrls: ['./order-list-custom.component.scss'],
  templateUrl: './order-list-custom.component.html',
})
export class OrderListCustomComponent
  extends OrderListComponent
  implements OnInit
{
  isShowFilters: boolean = false;
  dataFilters: any;
  myDataService: DataService;
  sortCustom: any = {
    sortField: 'updatedAt',
    sortType: 'DESC',
  };

  constructor(
    serverConfigService: ServerConfigService,
    dataService: DataService,
    localStorageService: LocalStorageService,
    router: Router,
    route: ActivatedRoute,
    myDataService: DataService
  ) {
    super(serverConfigService, dataService, localStorageService, router, route);

    super.setQueryFn(
      // tslint:disable-next-line:no-shadowed-variable
      (skip, take) => myDataService.query(getOrders),
      (data) => data.orders,
      // tslint:disable-next-line:no-shadowed-variable
      (skip, take) =>
        this.createQueryOptionsCustom(
          skip,
          take,
          this.searchControl.value,
          this.route.snapshot.queryParamMap.get('filter') || 'open'
        )
    );
  }

  ngOnInit(): void {
    ClarityIcons.addIcons(downloadIcon, uploadIcon);
    super.ngOnInit();
  }

  private createQueryOptionsCustom(
    // tslint:disable-next-line:no-shadowed-variable
    skip: number,
    take: number,
    searchTerm: string,
    activeFilterPreset?: string
  ): { options: OrderListOptions } {
    const filterConfig = this.filterPresets.find(
      (p) => p.name === activeFilterPreset
    );
    // tslint:disable-next-line:no-shadowed-variable
    let filter: any = {};
    let filterOperator: LogicalOperator = LogicalOperator.AND;
    if (filterConfig) {
      if (filterConfig.config.active != null) {
        filter.active = {
          eq: filterConfig.config.active,
        };
      }
      if (filterConfig.config.states) {
        filter.state = {
          in: filterConfig.config.states,
        };
      }
    } else if (activeFilterPreset === 'custom') {
      const queryParams = this.route.snapshot.queryParamMap;
      const states = queryParams.getAll('states') ?? [];
      const placedAtStart = queryParams.get('placedAtStart');
      const placedAtEnd = queryParams.get('placedAtEnd');
      if (states.length) {
        filter.state = {
          in: states,
        };
      }
      if (placedAtStart && placedAtEnd) {
        filter.orderPlacedAt = {
          between: {
            start: placedAtStart,
            end: placedAtEnd,
          },
        };
      } else if (placedAtStart) {
        filter.orderPlacedAt = {
          after: placedAtStart,
        };
      } else if (placedAtEnd) {
        filter.orderPlacedAt = {
          before: placedAtEnd,
        };
      }
    }
    if (searchTerm) {
      filter = {
        customerLastName: {
          contains: searchTerm,
        },
        transactionId: {
          contains: searchTerm,
        },
        code: {
          contains: searchTerm,
        },
      };
      filterOperator = LogicalOperator.OR;
    }

    return {
      options: {
        skip,
        take,
        filter: {
          ...(filter ?? {}),
          ...this.dataFilters,
        },
        sort: {
          [this.sortCustom.sortField]: this.sortCustom.sortType,
        },
        filterOperator,
      },
    };
  }

  async receiveMessage($event: any) {
    this.isShowFilters = $event;
  }

  async receiveDataFilterSelected($event: any) {
    this.dataFilters = $event ? $event : '';

    this.refresh();
  }

  async clearFilter() {
    this.dataFilters = '';

    this.refresh();
  }

  async receiveDataSortSelected($event: any) {
    const dataSort = $event && $event.split('-');
    this.sortCustom = {
      sortField: dataSort[0],
      sortType: dataSort[1],
    };
    this.refresh();
  }

  getCountryNames(order: Order) {
    if (order.shippingAddress) {
      return order.shippingAddress?.country;
    } else {
      return '';
    }
  }
}
