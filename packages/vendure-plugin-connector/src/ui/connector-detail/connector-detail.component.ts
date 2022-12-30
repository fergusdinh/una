import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '@vendure/admin-ui/core';
import {
  getAvailableEntitiesExportQuery,
  getConnectorByTypeQuery,
  getConnectorConfigUi,
} from '../queries';

@Component({
  selector: 'connector-detail-component',
  styleUrls: ['./connector-detail.component.scss'],
  templateUrl: './connector-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectorDetailComponent implements OnInit {
  connectorForm: FormGroup;
  connectorConfigUi: string;
  dataMapping: string;
  events: string[] = [
    'ProductEvent',
    'ProductVariantChannelEvent',
    'ProductVariantEvent',
    'AccountRegistrationEvent',
    'AccountVerifiedEvent',
    'AdministratorEvent',
    'AssetChannelEvent',
    'AssetEvent',
    'AttemptedLoginEvent',
    'ChangeChannelEvent',
    'ChannelEvent',
    'CollectionEvent',
    'CollectionModificationEvent',
    'CountryEvent',
    'CouponCodeEvent',
    'CustomerAddressEvent',
    'CustomerEvent',
    'ZoneMembersEvent',
    'CustomerGroupEntityEvent',
    'CustomerGroupChangeEvent',
    'FacetEvent',
    'FacetValueEvent',
    'FulfillmentEvent',
    'FulfillmentStateTransitionEvent',
    'GlobalSettingsEvent',
    'HistoryEntryEvent',
    'IdentifierChangeEvent',
    'IdentifierChangeRequestEvent',
    'LoginEvent',
    'LogoutEvent',
    'OrderEvent',
    'OrderLineEvent',
    'OrderPlacedEvent',
    'OrderStateTransitionEvent',
    'PasswordResetEvent',
    'PasswordResetVerifiedEvent',
    'PaymentMethodEvent',
    'PaymentStateTransitionEvent',
    'ProductChannelEvent',
    'ProductOptionEvent',
    'ProductOptionGroupChangeEvent',
    'ProductOptionGroupEvent',
    'PromotionEvent',
    'RefundStateTransitionEvent',
    'RoleChangeEvent',
    'RoleEvent',
    'SearchEvent',
    'ShippingMethodEvent',
    'StockMovementEvent',
    'TaxCategoryEvent',
    'TaxRateEvent',
    'ZoneEvent',
  ];
  entities: string[];
  connectorType: string;
  link: string;
  constructor(
    private formBuilder: FormBuilder,
    protected dataService: DataService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.connectorForm = this.formBuilder.group({
      settings: ['{}', Validators.required],
      connector: ['', Validators.required],
      availableEvents: [''],
    });
  }

  async ngOnInit(): Promise<void> {
    /* Get type connector, eg: is shopify or magento,... */
    const type = this.router.url.split('/');
    this.connectorType = type[type.length - 1];

    /* set type connector */
    this.connectorForm.controls['connector'].setValue(this.connectorType);

    /* Get setting of connector */
    this.dataService
      .query(getConnectorByTypeQuery, { type: this.connectorType })
      .mapStream((d: any) => d.getConnectorByType)
      .subscribe((getConnectorByType) => {
        if (getConnectorByType?.settings) {
          const settings = JSON.parse(getConnectorByType?.settings);
          this.connectorForm.controls['availableEvents'].setValue(
            settings.events
          );
          delete settings?.events;
          this.dataMapping = getConnectorByType?.settings;
          this.cdr.markForCheck();
        } else {
          this.connectorForm.controls['availableEvents'].setValue(this.events);
          this.dataMapping = null as unknown as string;
          this.cdr.markForCheck();
        }
      });

    // /* entities mapping */
    this.dataService
      .query(getAvailableEntitiesExportQuery)
      .mapStream((d: any) => d.availableEntitiesExport)
      .subscribe((entity) => {
        this.entities = entity;
        this.cdr.markForCheck();
      });

    // /* Connector select */
    this.dataService
      .query(getConnectorConfigUi, { type: this.connectorType })
      .single$.subscribe(async (result: any) => {
        this.connectorConfigUi = result.getConnectorConfigUi;
        this.link = JSON.parse(this.connectorConfigUi)?.link;
        this.cdr.markForCheck();
      });
  }
}
