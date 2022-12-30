import { Router } from '@angular/router';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  FormGroup,
} from '@angular/forms';
import { FormInputComponent } from '@vendure/admin-ui/core/common/component-registry-types';
import {
  DefaultFormComponentConfig,
  DefaultFormComponentId,
} from '@vendure/common/lib/shared-types';
import { JsonSchemaFormComponent, FrameworkLibraryService } from '@ajsf/core';
import { DataService, NotificationService } from '@vendure/admin-ui/core';
import { checkShopifyDomainIsExsit, updateConnectorMutation } from '../queries';

// import { DOCUMENT } from '@angular/common';

export function jsonValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error: ValidationErrors = { jsonInvalid: true };
    try {
      JSON.parse(control.value);
    } catch (e) {
      control.setErrors(error);
      return error;
    }

    control.setErrors(null);
    return null;
  };
}

@Component({
  selector: 'json-editor-form-input',
  template: `<json-schema-form
    loadExternalAssets="true"
    [form]="jsonFormObject"
    framework="no-framework"
    (onSubmit)="onSubmitFn($event)"
  ></json-schema-form>`,
  styleUrls: ['./json-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JsonEditorFormInputComponent
  implements FormInputComponent, AfterViewInit, OnInit
{
  static readonly id: DefaultFormComponentId = 'json-editor-form-input';
  readonly: boolean;
  jsonFormObject: any;
  public data: any;
  isConnected: boolean = false;
  formControl: FormControl;
  config: DefaultFormComponentConfig<'json-editor-form-input'>;
  isValid = true;
  errorMessage: string | undefined;
  yourCustomFramework: any = {
    stylesheets: ['./json-editor.component.scss'],
  };
  @ViewChild(JsonSchemaFormComponent, { static: true })
  editor: JsonSchemaFormComponent;
  @Input() connectorConfigUi: string;
  @Input() dataMapping: string;
  @Input() connectorForm: FormGroup;
  @Input() entities: any;
  constructor(
    private notificationService: NotificationService,
    protected dataService: DataService,
    private frameworkLibrary: FrameworkLibraryService,
    private router: Router
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {}

  async onSubmitFn(data: any) {
    try {
      switch (this.connectorForm.value.connector) {
        case 'shopify':
          /* Check  shop domain is exist */
          this.dataService
            .query(checkShopifyDomainIsExsit, {
              shopifyDomain: data.url,
            })
            .mapStream((d: any) => d.checkShopifyDomainIsExsit)
            .subscribe(async (isExsit) => {
              if (!isExsit) {
                this.updateConnector(data);
                window.location.href = `/api/offline/auth?shop=${data.url.replace(
                  /https?:\/\//,
                  ''
                )}`;
              } else {
                this.notificationService.error('Shop domain already used!', {
                  entity: 'Connector',
                });
              }
            });
          break;
        default:
          this.updateConnector(data);
          break;
      }
    } catch (error) {
      this.notificationService.error('Error', {
        entity: 'Connector',
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dataMapping && this.entities) {
      if (changes.connectorConfigUi?.currentValue) {
        const { schema, layout } = JSON.parse(
          changes.connectorConfigUi.currentValue
        );
        this.jsonFormObject = {
          schema: {
            ...schema,
            properties: {
              ...schema.properties,
              ...this.entities?.reduce(
                (acc: any, cur: string) => ({
                  ...acc,
                  [cur]: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: { type: 'string' },
                        field_mapping: { type: 'string' },
                      },
                    },
                    required: ['field', 'field_mapping'],
                  },
                }),
                {}
              ),
            },
          },
          layout: [
            ...layout,
            //field mapping data
            // {
            //   type: 'tabs',
            //   labelHtmlClass: 'nav',
            //   tabs: this.entities?.map((entity: string) => {
            //     return {
            //       title: `${entity} Mapping`,
            //       fieldHtmlClass: 'active',
            //       items: [
            //         {
            //           key: entity,
            //           type: 'array',
            //           listItems: 1,
            //           items: [
            //             {
            //               type: 'div',
            //               displayFlex: true,
            //               'flex-direction': 'row',
            //               items: [
            //                 {
            //                   key: `${entity}[].field`,
            //                   flex: '1 1 50px',
            //                   marginTop: '20px',
            //                   notitle: true,
            //                   placeholder: 'Field',
            //                 },
            //                 {
            //                   key: `${entity}[].field_mapping`,
            //                   flex: '4 4 200px',
            //                   notitle: true,
            //                   placeholder: 'Field Mapping',
            //                 },
            //               ],
            //             },
            //           ],
            //         },
            //       ],
            //     };
            //   }),
            // },
          ],
          data: JSON.parse(this.dataMapping),
        };
      }
    } else {
      if (changes.connectorConfigUi?.currentValue) {
        const { schema, layout, data } = JSON.parse(
          changes.connectorConfigUi.currentValue
        );
        this.jsonFormObject = {
          schema: {
            ...schema,
            properties: {
              ...schema.properties,
              ...this.entities?.reduce(
                (acc: any, cur: string) => ({
                  ...acc,
                  [cur]: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        field: { type: 'string' },
                        field_mapping: { type: 'string' },
                      },
                    },
                  },
                }),
                {}
              ),
            },
          },
          layout: [
            ...layout,
            //field mapping data
            // {
            //   type: 'tabs',
            //   labelHtmlClass: 'nav',
            //   tabs: this.entities?.map((entity: string) => {
            //     return {
            //       title: `${entity} Mapping`,
            //       fieldHtmlClass: 'active',
            //       items: [
            //         {
            //           key: entity,
            //           type: 'array',
            //           listItems: 1,
            //           items: [
            //             {
            //               type: 'div',
            //               displayFlex: true,
            //               'flex-direction': 'row',
            //               items: [
            //                 {
            //                   key: `${entity}[].field`,
            //                   flex: '1 1 50px',
            //                   marginTop: '20px',
            //                   notitle: true,
            //                   placeholder: 'Field',
            //                 },
            //                 {
            //                   key: `${entity}[].field_mapping`,
            //                   flex: '4 4 200px',
            //                   notitle: true,
            //                   placeholder: 'Field Mapping',
            //                 },
            //               ],
            //             },
            //           ],
            //         },
            //       ],
            //     };
            //   }),
            // },
          ],
          data: {
            ...data,
            ...this.entities?.reduce(
              (acc: any, cur: any) => ({
                ...acc,
                [cur]: [{ field: '', field_mapping: '' }],
              }),
              {}
            ),
          },
        };
      }
    }
  }

  async updateConnector(data: any) {
    const dataUrl =
      this.connectorForm.value.connector != 'woocommerce'
        ? data.url.replace(/https?:\/\//, '')
        : data.url;
    await this.dataService
      .mutate(updateConnectorMutation, {
        settings: JSON.stringify({
          ...data,
          url: dataUrl,
          events: this.connectorForm.value.availableEvents,
        }),
        type: this.connectorForm.value.connector,
      })
      .toPromise();
  }
}
