import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';

import { DataService, NotificationService } from '@vendure/admin-ui/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'filter-advanced',
  styleUrls: ['./filter-advanced.component.scss'],
  templateUrl: './filter-advanced.component.html',
})
export class FilterAdvancedComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() messageSelectedEvent = new EventEmitter<any>();

  @Input() isShow: boolean;
  private dataService: DataService;
  filterForm: FormGroup;
  // moreFilterForm: FormGroup;

  dataFilters: any = [
    { id: 1, code: 'totalQuantity', name: 'Quantity' },
    { id: 2, code: 'subTotal', name: 'Total' },
  ];

  constructor(
    dataService: DataService,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.filterForm = this.fb.group({
      totalQuantity: this.fb.group({
        start: ['', [Validators.required]],
        end: ['', [Validators.required]],
      }),
      subTotal: this.fb.group({
        start: [null, [Validators.required]],
        end: [null, [Validators.required]],
      }),
    });
  }

  async ngOnInit(): Promise<void> {}

  async closeMoreFilter() {
    this.isShow = false;
    this.messageEvent.emit(this.isShow);
  }

  async onSubmit() {
    const formValue = this.filterForm.value;

    if (formValue && formValue['totalQuantity']) {
      const newData: any = {
        totalQuantity: formValue['totalQuantity'].start
          ? {
              between: {
                ...formValue['totalQuantity'],
              },
            }
          : {},
        subTotal: formValue['subTotal'].start
          ? {
              between: {
                start: formValue['subTotal'].start * 100,
                end: formValue['subTotal'].end * 100,
              },
            }
          : {},
      };
      this.closeMoreFilter();
      this.messageSelectedEvent.emit(newData);
    } else {
      this.notificationService.error('Error', {});
    }
  }

  // get f() {
  //   return (this.filterForm.get('totalQuantity') as FormGroup).controls;
  // }
}
