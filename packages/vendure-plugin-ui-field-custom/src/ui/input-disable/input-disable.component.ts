import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DefaultFormComponentConfig } from '@vendure/common/lib/shared-types';
import { FormInputComponent } from '@vendure/admin-ui/core/common/component-registry-types';

/**
 * @description
 * A checkbox input. The default input component for `boolean` fields.
 *
 * @docsCategory custom-input-components
 * @docsPage default-inputs
 */
@Component({
  selector: 'vdr-input-disable',
  templateUrl: './input-disable.html',
  styleUrls: ['./input-disable.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputDisableComponent implements FormInputComponent, OnInit {
  static readonly id = 'vdr-input-disable';
  readonly: boolean;
  formControl: FormControl;
  config: DefaultFormComponentConfig<'vdr-input-disable'>;

  async ngOnInit(): Promise<void> {}
}
