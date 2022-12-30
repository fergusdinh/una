import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '@vendure/admin-ui/core/common/component-registry-types';
import { DataService } from '@vendure/admin-ui/core';
import { getCountries } from '../queries';
import { Country } from '@vendure/common/lib/generated-types';

@Component({
  selector: 'vdr-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySelectComponent implements FormInputComponent, OnInit {
  static readonly id = 'vdr-country-select';
  countries: Country[] = [];
  readonly: boolean;
  formControl: FormControl;
  config: DefaultFormComponentConfig<'vdr-country-select'>;
  constructor(
    protected dataService: DataService,
    private cdr: ChangeDetectorRef
  ) {}
  async ngOnInit(): Promise<void> {
    this.dataService.query(getCountries).single$.subscribe((result: any) => {
      this.countries = result?.countries?.items;
      this.cdr.markForCheck();
    });
  }
}
