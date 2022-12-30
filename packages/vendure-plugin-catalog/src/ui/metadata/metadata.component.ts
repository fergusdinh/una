import { Router } from '@angular/router';
import {
  FormInputComponent,
  InputComponentConfig,
} from '@vendure/admin-ui/core/common/component-registry-types';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  AfterViewChecked,
  ChangeDetectorRef,
} from '@angular/core';

import { getProduct } from './queries';

import { DataService } from '@vendure/admin-ui/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { DefaultFormComponentConfig } from '@vendure/common/lib/shared-types';
import { JsonSchemaFormComponent, FrameworkLibraryService } from '@ajsf/core';

@Component({
  selector: 'metadata',
  styleUrls: ['./metadata.component.scss'],
  templateUrl: './metadata.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetaDataComponent
  implements FormInputComponent, AfterViewChecked, OnInit
{
  @ViewChild('jsonSchemaFormComponent')
  jsonSchemaFormComponent!: JsonSchemaFormComponent;
  formMetaData: FormGroup;
  formOptions: object = { addSubmit: false };
  readonly: boolean;
  isValid: boolean = false;
  jsonFormObject: any = {
    schema: {
      type: 'object',
      properties: {
        field: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              value: { type: 'string' },
            },
            required: ['name', 'value'],
          },
        },
      },
    },
    layout: [
      {
        key: 'field',
        type: 'array',
        listItems: 1,
        items: [
          {
            type: 'div',
            displayFlex: true,
            'flex-direction': 'row',
            items: [
              {
                key: 'field[].name',
                // flex: '1 1 50px',
                'flex-direction': 'row',
                notitle: true,
                placeholder: 'Name',
              },
              {
                key: 'field[].value',
                // flex: '4 4 50px',
                // marginTop: '20px',
                notitle: true,
                placeholder: 'Value',
              },
            ],
          },
        ],
      },
    ],
  };
  formControl: FormControl;
  config: DefaultFormComponentConfig<'json-editor-form-input-product'>;
  dataField: any;
  isListInput?: boolean | undefined;

  constructor(
    private dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const routerData = this.router.url.split('/');

    if (parseInt(routerData[routerData.length - 1])) {
      this.dataService
        .query(getProduct, {
          id: routerData[routerData.length - 1],
        })
        .mapStream((d: any) => d.product)
        .subscribe((product) => {
          this.dataField = product?.customFields
            ? JSON.parse(product?.customFields?.metadata)?.field
            : [];

          if (product && product?.customFields) {
            this.jsonFormObject = {
              schema: {
                type: 'object',
                properties: {
                  field: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        value: { type: 'string' },
                      },
                    },
                    required: ['name', 'value'],
                  },
                },
              },
              layout: [
                {
                  key: 'field',
                  type: 'array',
                  listItems: 1,
                  items: [
                    {
                      type: 'div',
                      displayFlex: true,
                      'flex-direction': 'row',
                      items: [
                        {
                          key: 'field[].name',
                          // flex: '1 1 50px',
                          'flex-direction': 'row',
                          notitle: true,
                          placeholder: 'Name',
                        },
                        {
                          key: 'field[].value',
                          // flex: '4 4 50px',
                          // marginTop: '20px',
                          notitle: true,
                          placeholder: 'Value',
                        },
                      ],
                    },
                  ],
                },
              ],
              data: {
                field: this.dataField,
              },
            };
            this.cdr.detectChanges();
          }
        });
    }
  }

  ngAfterViewChecked(): void {
    if (this.jsonSchemaFormComponent) {
      this.jsonSchemaFormComponent.isValid.subscribe(
        (valid: boolean) => (this.isValid = valid)
      );
    }
  }

  async onSubmitFn(data: any) {
    this.formControl.setValue(JSON.stringify(data));
  }

  submitCustom() {
    this.jsonSchemaFormComponent.submitForm();
  }
}
