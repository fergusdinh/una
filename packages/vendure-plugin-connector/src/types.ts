import {
  VendureEvent,
  TransactionalConnection,
  Injector,
  ConfigService,
  EntityHydrator,
  Product,
} from '@vendure/core';
import { ConnectorDefault } from './api';
import { ConnectorPluginOptions } from './api/connector-plugin-options';
import {
  BigCommerceSettings,
  ChannelSettings,
  ShopifySettings,
} from './api/gql/schemaConfig';

export interface RequestFnResult {
  body?: ArrayBuffer | ArrayBufferView | NodeJS.ReadableStream | string;
  headers?: Record<string, string>;
}

// export type RequestFn = (event: VendureEvent, channel: any) => RequestFnResult;
export interface IConnector {
  type: string;
  icon: string;
  description: string;
  name: string;
  schema: {
    type: string;
    properties: {
      url: { type: string };
    };
    required?: string[];
  };
  layout: {
    key: string;
    title: string;
    placeholder?: string;
    validationMessages?: {
      require: string;
    };
    htmlClass?: string; // CSS Class(es) to be added to the container div
    fieldHtmlClass?: string; // CSS Class(es) to be added to field input (or similar)
    labelHtmlClass?: string; // CSS Class(es) to be added to the label of the field (or similar)
  }[];
  data: {
    url: string;
  };

  // requestFn: RequestFn;
  syncProducts(event: VendureEvent, injector: Injector): Promise<void>;

  syncProductVariant(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void>;

  syncProductUpdate(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void>;

  syncProductVariantsUpdate(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void>;

  syncDeleteProduct(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void>;

  syncOrder(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void>;

  syncCustomer(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void>;

  syncCustomerUpdate(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void>;

  syncCustomerDelete(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void>;

  syncCustomerAddress(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void>;

  syncCustomerAddressUpdate(
    channel: ChannelSettings<ShopifySettings | BigCommerceSettings>,
    ConnectorPlugin: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void>;

  doWebhook(
    type: string,
    event: VendureEvent,
    channel: any,
    injector: Injector
  ): Promise<void>;

  eventBusHandleProducts(input: InputEventBusHandle): Promise<void>;

  eventBusHandleCustomer(input: InputEventBusHandle): Promise<void>;

  eventBusHandleOrders(input: InputEventBusHandle): Promise<void>;

  handleError<T extends { launchPipelineExecution: { __typename: string } }>(
    result: T,
    type: string,
    methodSync: MethodSync,
    entitySync: EntitySync
  ): Promise<void>;
}
export interface InputEventBusHandle {
  event: VendureEvent;
  eventName: string;
  typeEventBus: string;
  injector: Injector;
  channel: any;
}

export type MethodSync = 'created' | 'deleted' | 'updated';

export type EntitySync =
  | 'order'
  | 'customer'
  | 'product'
  | 'product-variant'
  | 'customer-address'
  | 'status-order';

export interface InputEventBusHandleProducts extends InputEventBusHandle {}

export interface InputEventBusHandleCustomers extends InputEventBusHandle {}

export interface InputEventBusHandleOrders extends InputEventBusHandle {}

export interface SelectorParams {
  repositoryName: string;
  repositoryLocationName: string;
  pipelineName: string;
}
