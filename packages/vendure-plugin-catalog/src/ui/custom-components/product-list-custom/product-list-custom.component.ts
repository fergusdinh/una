import { getDataProduct } from './queries';
import { ProductListComponent } from '@vendure/admin-ui/catalog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MoreFilters } from '../more-filters/more-filters.component';

import {
  DataService,
  JobQueueService,
  LogicalOperator,
  ModalService,
  NotificationService,
  SearchInput,
  ServerConfigService,
} from '@vendure/admin-ui/core';

@Component({
  selector: 'product-list-custom',
  styleUrls: ['./product-list-custom.component.scss'],
  templateUrl: './product-list-custom.component.html',
})
export class ProductListCustomComponent
  extends ProductListComponent
  implements OnInit
{
  @ViewChild(MoreFilters) child: any;

  private myDataService: DataService;
  inStock = true;
  outStock = false;
  stock = true;
  sort: any;
  isShowMoreFilters = false;

  dataSelectSorting = [
    { id: 1, name: 'name', value: 'Name A-Z', sort: 'ASC' },
    { id: 2, name: 'name', value: 'Name Z-A', sort: 'DESC' },
    { id: 3, name: 'price', value: 'Price Low - High', sort: 'ASC' },
    { id: 4, name: 'price', value: 'Price High - Low', sort: 'DESC' },
  ];

  constructor(
    dataService: DataService,
    modalService: ModalService,
    notificationService: NotificationService,
    jobQueueService: JobQueueService,
    serverConfigService: ServerConfigService,
    router: Router,
    route: ActivatedRoute,
    myDataService: DataService
  ) {
    super(
      dataService,
      modalService,
      notificationService,
      jobQueueService,
      serverConfigService,
      router,
      route
    );

    super.setQueryFn(
      (...args: any[]) => myDataService.query(getDataProduct),
      (data) => data.search,
      // tslint:disable-next-line:no-shadowed-variable
      (skip, take) => ({
        input: {
          skip,
          take,
          term: this.searchTerm,
          facetValueIds: this.facetValueIds,
          facetValueOperator: LogicalOperator.AND,
          groupByProduct: this.groupByProduct,
          inStock: this.stock,
          sort: this.sort,
        } as SearchInput,
      })
    );
  }

  setInStock() {
    this.stock = true;
    this.refresh();
  }

  setOutStock() {
    this.stock = false;
    this.refresh();
  }

  async onChangeSelect($event: any) {
    const filterSort = this.dataSelectSorting.filter(
      (item) => item.id == $event.target.value
    );

    this.sort = {
      [filterSort[0].name]: filterSort[0].sort,
    };
    this.refresh();
  }

  async showMoreFilters() {
    this.isShowMoreFilters = !this.isShowMoreFilters;
    this.refresh();
  }

  async isClear() {
    super.setQueryParam({ q: '' || null, page: 1 });
    this.sort = null;
    this.refresh();
  }

  async redirectSetting() {
    this.router.navigate(['extensions/catalog/products', 'settings']);
  }

  async ngOnInit(): Promise<void> {
    super.ngOnInit();
  }

  receiveMessage($event: any) {
    this.isShowMoreFilters = $event;
  }
}
