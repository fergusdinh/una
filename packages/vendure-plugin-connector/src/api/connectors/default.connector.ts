import {
  EntitySync,
  IConnector,
  InputEventBusHandle,
  MethodSync,
} from '../../types';
import {
  Asset,
  TransactionalConnection,
  ProductOptionGroup,
  Logger,
  Product,
} from '@vendure/core';
import { VendureEvent, Injector } from '@vendure/core';
import { ConnectorPluginOptions } from '../..';
import { loggerCtx } from '../../constants';
import {
  BigCommerceSettings,
  ChannelSettings,
  ShopifySettings,
  WooCommerceSettings,
} from '../gql/schemaConfig';
export class ConnectorDefault implements IConnector {
  name = 'ConnectorDefault';
  icon = 'test';
  description = 'test';
  type = 'connector_default';
  schema = {
    type: 'object',
    properties: {
      url: {
        type: 'string',
      },
    },
    required: ['url'],
  };
  layout = [
    {
      key: 'url',
      title: 'Url',
      placeholder: 'url',
      htmlClass: '',
      fieldHtmlClass: '',
      labelHtmlClass: '',
    },
  ];
  data = {
    url: '',
  };

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key: string, value: any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

  async getAssets(
    connection: TransactionalConnection,
    ids: string[]
  ): Promise<Asset[]> {
    if (ids.length > 0) {
      return await connection
        .getRepository(Asset)
        .createQueryBuilder('asset')
        .where('asset.id IN (:...id)', { id: ids })
        .getMany();
    }
    return [];
  }

  async changeProductOptionToProductOptionGroup(
    connection: TransactionalConnection,
    variants: any
  ) {
    const variantsProduct = [];
    for (let i = 0; i < variants.length; i++) {
      const optionGroup = await this.getProductOptionGroup(
        connection,
        variants[i].productId
      );
      variantsProduct.push({
        ...variants[i],
        optionGroup,
      });
    }
    return variantsProduct;
  }

  async getProductOptionGroup(
    connection: TransactionalConnection,
    productId: string
  ) {
    return await connection
      .getRepository(ProductOptionGroup)
      .createQueryBuilder('product_option_group')
      .leftJoinAndSelect('product_option_group.options', 'option')
      .where('product_option_group.product.id = :id', { id: productId })
      .getMany();
  }

  async syncProducts(event: VendureEvent, injector: Injector): Promise<void> {}

  async syncProductVariant(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {}

  async syncProductUpdate(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {}

  async syncProductVariantsUpdate(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {}

  async syncDeleteProduct(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {}

  async syncOrder(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void> {}

  async syncOrderUpdate(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    access_token_offline?: string | null | undefined
  ): Promise<void> {}

  async syncOrderDelete(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    access_token_offline?: string | null | undefined
  ): Promise<void> {}

  async syncCustomer(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {}

  async syncCustomerUpdate(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void> {}

  async syncCustomerDelete(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void> {}

  async syncCustomerAddressDelete(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent,
    access_token_offline?: string | null | undefined
  ): Promise<void> {}

  async syncCustomerAddress(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void> {}

  async syncCustomerAddressUpdate(
    channel: ChannelSettings<
      ShopifySettings | BigCommerceSettings | WooCommerceSettings
    >,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: string,
    event: VendureEvent
  ): Promise<void> {}

  async doWebhook(
    type: string,
    event: VendureEvent,
    channel: any,
    injector: Injector
  ): Promise<void> {}

  async eventBusHandleProducts(input: InputEventBusHandle) {}

  async eventBusHandleCustomer(input: InputEventBusHandle) {}

  async eventBusHandleOrders(input: InputEventBusHandle) {}

  async handleError<
    T extends { launchPipelineExecution: { __typename: string } }
  >(result: T, type: string, methodSync: MethodSync, entitySync: EntitySync) {
    if (result.launchPipelineExecution.__typename !== 'LaunchRunSuccess') {
      Logger.error(
        `Failed ${methodSync.toUpperCase()} ${entitySync.toUpperCase()} On ${type}!`,
        loggerCtx
      );
    } else {
      Logger.info(
        `${methodSync.toUpperCase()} ${entitySync.toUpperCase()} On ${type}!`,
        loggerCtx
      );
    }
  }
}
