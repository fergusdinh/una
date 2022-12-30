import { ConnectorDefault } from './default.connector';
import { ConnectorPluginOptions } from '../connector-plugin-options';
import {
  VendureEvent,
  TransactionalConnection,
  Injector,
  Logger,
  Product,
  ProductVariantAsset,
  Asset,
} from '@vendure/core';
import request from 'graphql-request';
import YAML from 'yaml';

import { loggerCtx } from '../../constants';
import { job } from '../gql/job.gql';
import {
  ChannelSettings,
  BigCommerceSettings,
  ConnectorType,
  schemaConfigData,
} from '../gql/schemaConfig';
import {
  InputEventBusHandleCustomers,
  InputEventBusHandleOrders,
  InputEventBusHandleProducts,
} from '../../types';
import { ConnectorPlugin } from '../..';
import { selector } from '../gql/selector';
export class BigcommerceConnector extends ConnectorDefault {
  private synsProductsResult = null as Product | null;
  public name = 'BigCommerce';
  public type = 'bigcommerce';
  public icon = '/admin/assets/bigcommerce.png';
  public link = 'https://bigcommerce.com/';
  public description =
    'An online store builder that comes with a full pack of features to drive businesses of all sizes.';
  public schema = {
    type: 'object',
    properties: {
      client_id: { type: 'string' },
      url: { type: 'string' },
      access_token: { type: 'string' },
    },
    required: ['client_id', 'url', 'access_token'],
  };
  public layout = [
    {
      key: 'client_id',
      title: 'Client ID',
      placeholder: 'Client ID',
      validationMessages: {
        require: 'This field is required.',
      },
      htmlClass: 'form-group',
      fieldHtmlClass: '',
      labelHtmlClass: 'clr-control-label',
    },
    // {
    //   key: 'client_secret',
    //   title: 'Client Secret',
    //   placeholder: 'Client Secret',
    //   validationMessages: {
    //     require: 'This field is required.',
    //   },
    //   htmlClass: 'form-group',
    //   fieldHtmlClass: '',
    //   labelHtmlClass: 'clr-control-label',
    // },
    {
      key: 'access_token',
      title: 'Access Token',
      placeholder: 'Access Token',
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
  ];
  public data = {
    client_id: '',
    access_token: '',
    url: '',
  };

  //sync order
  async syncOrder(
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_create_order_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_update_order_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_update_order_bigcommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'updated', 'order');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

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
    channel: ChannelSettings<BigCommerceSettings>,
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
          transformFieldName: 'transform_create_product',
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_create_product_bigcommerce',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'created', 'product');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncProductUpdate(
    channel: ChannelSettings<BigCommerceSettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {
    try {
      const { entity, ctx } = event as any;
      const { req } = ctx;
      const assetsImg =
        entity?.assetIds &&
        (await this.getAssets(
          injector.get(TransactionalConnection),
          entity?.assetIds
        ));
      const rawConfigData = {
        ...entity,
        ...(entity?.assetIds && {
          assets: assetsImg.map((item: Asset) => {
            return {
              ...item,
              source: `${req?.headers?.origin}/assets/${item.source}`,
              preview: `${req?.headers?.origin}/assets/${item.preview}`,
            };
          }),
        }),
        ...(entity?.featuredAsset
          ? {
              featuredAsset: {
                ...entity?.featuredAsset,
                source: `${req?.headers?.origin}/assets/${entity.featuredAsset.source}`,
                preview: `${req?.headers?.origin}/assets/${entity.featuredAsset.preview}`,
              },
            }
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_update_product_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
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
      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_update_variant_product_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_delete_product_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_create_customer_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_update_customer_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { entity } = event as any;
      const configData = schemaConfigData(entity, channel, connectorType, {
        setFieldName: 'set_customer',
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_delete_customer_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_delete_address_customer_bigcommerce',
            },
          },
        },
      });
      if (result.launchPipelineExecution.__typename !== 'LaunchRunSuccess') {
        Logger.error(
          `Failed Delete Customer Address On BigCommerce!`,
          loggerCtx
        );
      } else {
        Logger.info(`Deleted Customer Address On BigCommerce!`, loggerCtx);
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  async syncCustomerAddress(
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_create_address_customer_bigcommerce',
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
    channel: ChannelSettings<BigCommerceSettings>,
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
              repositoryLocationName: 'data-bigcommerce',
              pipelineName: 'do_update_address_customer_bigcommerce',
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
      default:
        break;
    }
  }
}
