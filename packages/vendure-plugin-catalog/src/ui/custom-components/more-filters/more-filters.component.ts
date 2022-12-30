import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

import { DataService } from '@vendure/admin-ui/core';

@Component({
  selector: 'more-filters',
  styleUrls: ['./more-filters.component.scss'],
  templateUrl: './more-filters.component.html',
})
export class MoreFilters implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();

  @Input() isShow: boolean;
  private dataService: DataService;
  // moreFilterForm: FormGroup;

  constructor(dataService: DataService) {}

  async ngOnInit(): Promise<void> {}

  async closeMoreFilter() {
    this.isShow = false;
    this.messageEvent.emit(this.isShow);
  }
}
