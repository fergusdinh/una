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
  selector: 'vdr-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonFormInputComponent
  implements FormInputComponent, OnInit
{
  static readonly id = 'toggle-button-form-input';
  readonly: boolean;
  formControl: FormControl;
  config: DefaultFormComponentConfig<'toggle-button-form-input'>;

  async ngOnInit(): Promise<void> {}
}
