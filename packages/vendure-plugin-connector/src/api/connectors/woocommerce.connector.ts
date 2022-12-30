import { ConnectorDefault } from './default.connector';
import { ConnectorPluginOptions } from '../connector-plugin-options';
import {
  VendureEvent,
  TransactionalConnection,
  Injector,
  Logger,
  Product,
  ProductVariantAsset,
  ConfigService,
} from '@vendure/core';

import request from 'graphql-request';
import YAML from 'yaml';
import { loggerCtx } from '../../constants';
import { job } from '../gql/job.gql';
import { selector } from '../gql/selector';

import {
  ChannelSettings,
  WooCommerceSettings,
  ConnectorType,
  schemaConfigData,
} from '../gql/schemaConfig';

import {
  InputEventBusHandleCustomers,
  InputEventBusHandleOrders,
  InputEventBusHandleProducts,
} from '../../types';

import { ConnectorPlugin } from '../..';

export class WoocommerceConnector extends ConnectorDefault {
  private synsProductsResult = null as Product | null;
  public name = 'Woocommerce';
  public type = 'woocommerce';
  public icon = '/admin/assets/woocommerce.png';
  public link = 'https://woocommerce.com/';
  public description =
    'An eCommerce plug-in built for Wordpress with endless customizability.';
  public schema = {
    type: 'object',
    properties: {
      consumer_key: { type: 'string' },
      consumer_secret: { type: 'string' },
      url: { type: 'string' },
      version: { type: 'string' },
    },
    required: ['consumer_key', 'consumer_secret', 'url', 'version'],
  };
  public layout = [
    {
      key: 'consumer_key',
      title: 'Consumer Key',
      placeholder: 'Consumer Key',
      validationMessages: {
        require: 'This field is required.',
      },
      htmlClass: 'form-group',
      fieldHtmlClass: '',
      labelHtmlClass: 'clr-control-label',
    },
    {
      key: 'consumer_secret',
      title: 'Consumer Secret',
      placeholder: 'Consumer Secret',
      validationMessages: {
        require: 'This field is required.',
      },
      htmlClass: 'form-group',
      fieldHtmlClass: '',
      labelHtmlClass: 'clr-control-label',
    },
    {
      key: 'url',
      title: 'Url',
      placeholder: 'Url',
      validationMessages: {
        require: 'This field is required.',
      },
      htmlClass: 'form-group',
      fieldHtmlClass: '',
      labelHtmlClass: 'clr-control-label',
    },
    {
      key: 'version',
      title: 'Version',
      placeholder: 'Version',
      validationMessages: {
        require: 'This field is required.',
      },
      htmlClass: 'form-group',
      fieldHtmlClass: '',
      labelHtmlClass: 'clr-control-label',
    },
  ];
  public data = {
    consumer_key: '',
    consumer_secret: '',
    url: '',
    version: '',
  };

  //sync order
  async syncOrder(
    channel: ChannelSettings<WooCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { order } = event as any;
      const configData = schemaConfigData(order, channel, connectorType, {
        setFieldName: 'set_order',
        configFieldName: 'order',
        transformFieldName: 'transform_create_order',
      });

      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_create_order_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'created', 'order');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncOrderUpdate(
    channel: ChannelSettings<WooCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { order } = event as any;
      const configData = schemaConfigData(order, channel, connectorType, {
        setFieldName: 'set_order',
        configFieldName: 'order',
        transformFieldName: 'transform_update_order',
      });

      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_update_order_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'updated', 'order');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncOrderStatusUpdate(
    channel: ChannelSettings<WooCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { order, payment, fulfillment } = event as any;
      console.log('order-------', order);
      console.log('payment-------', payment);
      console.log('fulfillment-------', fulfillment);
      const configData = schemaConfigData(order, channel, connectorType, {
        setFieldName: 'set_order',
        configFieldName: 'order',
        transformFieldName: 'transform_update_order',
      });

      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_update_order_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'updated', 'status-order');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncOrderDelete(
    channel: ChannelSettings<WooCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity, order } = event as any;

      const configData = schemaConfigData(order, channel, connectorType, {
        setFieldName: 'set_order',
        configFieldName: 'order',
        transformFieldName: 'transform_del_order',
      });

      console.log('configData', YAML.stringify(configData));
      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_delete_order_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'deleted', 'order');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  //sync product
  async syncProducts(event: VendureEvent, injector: Injector): Promise<void> {
    try {
      this.synsProductsResult = null;
      const { entity, ctx } = event as any;
      const { req } = ctx;
      const rawAssetsImg = await this.getAssets(
        injector.get(TransactionalConnection),
        entity?.assetIds ? entity?.assetIds : []
      );
      const assetsImg = rawAssetsImg?.map((asset) => {
        return {
          ...asset,
          ...(asset?.source && {
            source: `${req?.headers?.origin}/assets/${asset.source}`,
          }),
          ...(asset?.preview && {
            preview: `${req?.headers?.origin}/assets/${asset.preview}`,
          }),
        };
      });
      this.synsProductsResult = {
        ...entity,
        featuredAsset: {
          ...entity.featuredAsset,
          ...(entity.featuredAsset?.source && {
            source: `${req?.headers?.origin}/assets/${entity.featuredAsset.source}`,
          }),
          ...(entity.featuredAsset?.preview && {
            preview: `${req?.headers?.origin}/assets/${entity.featuredAsset.preview}`,
          }),
        },
        ...(entity?.assetIds && { assets: assetsImg }),
      };
      Logger.info(`Products Created!`, loggerCtx);
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncProductVariant(
    channel: ChannelSettings<WooCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {
    try {
      const { entity } = event as any;
      const rawConfigData = {
        variants: await this.changeProductOptionToProductOptionGroup(
          injector.get(TransactionalConnection),
          entity
        ),
        ...this.synsProductsResult,
      };
      const configData = schemaConfigData(
        rawConfigData,
        channel,
        connectorType,
        {
          setFieldName: 'set_product',
          configFieldName: 'product',
          transformFieldName: 'transform_product',
        }
      );

      console.log('YAML.stringify(configData)', YAML.stringify(configData));
      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_create_product_woocommerce',
            }),
            executionMetadata: {
              tags: [
                {
                  key: 'externalId',
                  value: rawConfigData?.id,
                },
              ],
            },
          },
        },
      });
      this.handleError(result, this.type, 'created', 'product');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncProductUpdate(
    channel: ChannelSettings<WooCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {
    try {
      const { entity } = event as any;
      const assetsImg =
        entity?.assetIds &&
        (await this.getAssets(
          injector.get(TransactionalConnection),
          entity?.assetIds
        ));
      const rawConfigData = {
        ...entity,
        ...(entity?.assetIds && { assets: assetsImg }),
        ...(entity?.featuredAsset
          ? { featuredAsset: entity?.featuredAsset }
          : { featuredAsset: { source: null } }),
      };
      const configData = schemaConfigData(
        rawConfigData,
        channel,
        connectorType,
        {
          setFieldName: 'set_product',
          configFieldName: 'product',
          transformFieldName: 'transform_update_product',
        },
        {
          variants: [],
          delete: [],
        }
      );
      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_update_product_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'updated', 'product');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncProductVariantsUpdate(
    channel: ChannelSettings<WooCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ): Promise<void> {
    try {
      const { entity, ctx } = event as any;
      const { req } = ctx;
      const entityUpdatedImgUrl = entity.map((item: any) => {
        return {
          ...item,
          assets:
            item.assets.length !== 0
              ? item.assets.map((asset: ProductVariantAsset) => {
                  return {
                    ...asset,
                    asset: {
                      ...asset.asset,
                      source: `${req?.headers?.origin}/assets/${asset.asset.source}`,
                      preview: `${req?.headers?.origin}/assets/${asset.asset.preview}`,
                    },
                  };
                })
              : item.assets,
          featuredAsset: item.featuredAsset
            ? {
                ...item.featuredAsset,
                source: `${req?.headers?.origin}/assets/${item.featuredAsset.source}`,
                preview: `${req?.headers?.origin}/assets/${item.featuredAsset.preview}`,
              }
            : item.featuredAsset,
        };
      });
      const configData = schemaConfigData(
        {},
        channel,
        connectorType,
        {
          setFieldName: 'set_variant_product',
          configFieldName: 'variant',
          transformFieldName: 'transform_update_variant_product',
        },
        {
          variants: entityUpdatedImgUrl,
        }
      );

      console.log('configData', configData);
      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_update_variant_product_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'updated', 'product-variant');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncDeleteProduct(
    channel: ChannelSettings<WooCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity } = event as any;
      const rawConfigData = {
        variants: entity,
      };
      const configData = schemaConfigData(
        rawConfigData,
        channel,
        connectorType,
        {
          setFieldName: 'set_product',
          configFieldName: 'product',
        }
      );
      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_delete_product_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'deleted', 'product');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  //sync customer
  async syncCustomer(
    channel: ChannelSettings<WooCommerceSettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity } = event as any;
      const configData = schemaConfigData(entity, channel, connectorType, {
        setFieldName: 'set_customer',
        transformFieldName: 'transform_create_customer',
        configFieldName: 'customer',
      });

      const result = await request({
        url: connectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_create_customer_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'created', 'customer');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncCustomerUpdate(
    channel: ChannelSettings<WooCommerceSettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity } = event as any;
      const configData = schemaConfigData(entity, channel, connectorType, {
        configFieldName: 'customer',
        setFieldName: 'set_customer',
        transformFieldName: 'transform_update_customer',
      });
      const result = await request({
        url: connectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_update_customer_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'updated', 'customer');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncCustomerDelete(
    channel: ChannelSettings<WooCommerceSettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity } = event as any;
      const configData = schemaConfigData(entity, channel, connectorType, {
        setFieldName: 'set_customer',
        configFieldName: 'customer',
        transformFieldName: 'transform_delete_customer',
      });
      const result = await request({
        url: connectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_delete_customer_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'deleted', 'customer');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncCustomerAddressDelete(
    channel: ChannelSettings<WooCommerceSettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity } = event as any;
      const configData = schemaConfigData(entity, channel, connectorType, {
        setFieldName: 'set_address_customer',
        configFieldName: 'address',
      });
      const result = await request({
        url: connectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: {
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_delete_address_customer_woocommerce',
            },
          },
        },
      });
      if (result.launchPipelineExecution.__typename !== 'LaunchRunSuccess') {
        Logger.error(
          `Failed Delete Customer Address On woocommerce!`,
          loggerCtx
        );
      } else {
        Logger.info(`Deleted Customer Address On woocommerce!`, loggerCtx);
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncCustomerAddress(
    channel: ChannelSettings<WooCommerceSettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity } = event as any;
      const configData = schemaConfigData(entity, channel, connectorType, {
        setFieldName: 'set_address_customer',
        configFieldName: 'address',
        transformFieldName: 'transform_create_address_customer',
      });
      const result = await request({
        url: connectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(
              JSON.parse(JSON.stringify(configData, this.getCircularReplacer()))
            ),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_create_address_customer_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'created', 'customer-address');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncCustomerAddressUpdate(
    channel: ChannelSettings<WooCommerceSettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity } = event as any;
      const configData = schemaConfigData(entity, channel, connectorType, {
        setFieldName: 'set_address_customer',
        configFieldName: 'address',
      });
      const result = await request({
        url: connectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(
              JSON.parse(JSON.stringify(configData, this.getCircularReplacer()))
            ),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-woocommerce',
              pipelineName: 'do_update_address_customer_woocommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'updated', 'customer-address');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async doWebhook(
    type: string,
    event: VendureEvent,
    channel: any,
    injector: Injector
  ) {
    if (type === this.type) {
      const { type: typeEventBus } = event as any;
      await this.eventBusHandleProducts({
        event,
        channel,
        eventName: event.constructor.name,
        injector,
        typeEventBus,
      });
      await this.eventBusHandleCustomer({
        event,
        channel,
        eventName: event.constructor.name,
        injector,
        typeEventBus,
      });
      await this.eventBusHandleOrders({
        event,
        channel,
        eventName: event.constructor.name,
        injector,
        typeEventBus,
      });
    }
  }

  async eventBusHandleProducts(input: InputEventBusHandleProducts) {
    switch (true) {
      case input.eventName === 'ProductEvent' &&
        input.typeEventBus === 'created':
        await this.syncProducts(input.event, input.injector);
        break;
      case input.eventName === 'ProductVariantEvent' &&
        input.typeEventBus === 'created':
        await this.syncProductVariant(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event,
          input.injector
        );
        break;
      case input.eventName === 'ProductEvent' &&
        input.typeEventBus === 'updated':
        await this.syncProductUpdate(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event,
          input.injector
        );
        break;
      case input.eventName === 'ProductVariantEvent' &&
        input.typeEventBus === 'updated':
        await this.syncProductVariantsUpdate(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case input.eventName === 'ProductVariantEvent' &&
        input.typeEventBus === 'deleted':
        await this.syncDeleteProduct(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      default:
        break;
    }
  }

  async eventBusHandleCustomer(input: InputEventBusHandleCustomers) {
    switch (true) {
      case input.eventName === 'CustomerEvent' &&
        input.typeEventBus === 'created':
        await this.syncCustomer(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case input.eventName === 'CustomerEvent' &&
        input.typeEventBus === 'deleted':
        await this.syncCustomerDelete(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case input.eventName === 'CustomerEvent' &&
        input.typeEventBus === 'updated':
        await this.syncCustomerUpdate(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case input.eventName === 'CustomerAddressEvent' &&
        input.typeEventBus === 'created':
        await this.syncCustomerAddress(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case input.eventName === 'CustomerAddressEvent' &&
        input.typeEventBus === 'updated':
        await this.syncCustomerAddressUpdate(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case input.eventName === 'CustomerAddressEvent' &&
        input.typeEventBus === 'deleted':
        await this.syncCustomerAddressDelete(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      default:
        break;
    }
  }

  async eventBusHandleOrders(input: InputEventBusHandleOrders) {
    const { ctx, order, payment, fulfillment, entity } = input.event as any;

    console.log('input----', {
      eventName: input.eventName,
      type: input.typeEventBus,
      state: order?.state,
    });

    // console.log('payment----', payment)
    // console.log('fulfillment----', fulfillment)
    switch (true) {
      case input.eventName === 'OrderStateTransitionEvent' &&
        order?.state === 'ArrangingPayment':
        await this.syncOrder(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case input.eventName === 'OrderStateTransitionEvent' &&
        order?.state === 'ArrangingAdditionalPayment':
        await this.syncOrderUpdate(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case input.eventName === 'OrderStateTransitionEvent' &&
        order?.state === 'ArrangingAdditionalPayment':
        await this.syncOrderUpdate(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case (input.eventName === 'StockMovementEvent' &&
        input.typeEventBus === 'SALE') ||
        (input.eventName === 'StockMovementEvent' &&
          input.typeEventBus === 'ALLOCATION') ||
        (input.eventName === 'OrderStateTransitionEvent' &&
          order?.state === 'Shipped') ||
        (input.eventName === 'OrderStateTransitionEvent' &&
          order?.state === 'Delivered'):
        await this.syncOrderStatusUpdate(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      case (input.eventName === 'OrderStateTransitionEvent' &&
        order?.state === 'Cancelled') ||
        (input.eventName === 'RefundStateTransitionEvent' &&
          order?.state === 'PaymentSettled'):
        await this.syncOrderDelete(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event
        );
        break;
      default:
        break;
    }
  }
}
