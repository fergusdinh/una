import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DataService } from '@vendure/admin-ui/core';

import '@cds/core/icon/register.js';
import { ClarityIcons, sortByIcon, filterIcon } from '@cds/core/icon';

@Component({
  selector: 'order-filter',
  styleUrls: ['./order-filter.component.scss'],
  templateUrl: './order-filter.component.html',
})
export class OrderFilterComponent implements OnInit {
  @Output() isShowFiltersEvent = new EventEmitter<boolean>();
  @Output() onSelectedSort = new EventEmitter<string>();
  @Output() clearEvent = new EventEmitter<any>();

  @Input() dataFilters: any;

  dataSelectSorting = [
    { id: 1, name: 'name', value: 'Name A-Z', sort: 'customerLastName-ASC' },
    { id: 2, name: 'name', value: 'Name Z-A', sort: 'customerLastName-DESC' },
    { id: 3, name: 'price', value: 'Price Low - High', sort: 'total-ASC' },
    { id: 4, name: 'price', value: 'Price High - Low', sort: 'total-DESC' },
  ];

  isShowFilters: boolean = false;
  isSelectedValue: string = '';

  constructor() {}

  ngOnInit(): void {
    ClarityIcons.addIcons(sortByIcon, filterIcon);
  }

  async setItem(input: any) {
    this.onSelectedSort.emit(input.sort);
    this.isSelectedValue = input.value;
  }

  async showFilters() {
    this.isShowFilters = true;
    this.isShowFiltersEvent.emit(this.isShowFilters);
  }

  receiveMessage($event: any) {
    this.isShowFilters = $event;
  }

  async removeSelectedSort() {
    this.isSelectedValue = '';
    this.onSelectedSort.emit('updatedAt-DESC');
    this.clearEvent.emit({});
  }
}
