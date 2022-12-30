import { Customer, Product, Translated } from '@vendure/core';
import {
  VendureEvent,
  TransactionalConnection,
  Injector,
  Logger,
  ProductVariantAsset,
  Asset,
} from '@vendure/core';
import { ConnectorPluginOptions } from '../connector-plugin-options';
import { ConnectorDefault } from './default.connector';
import { loggerCtx } from '../../constants';
import YAML from 'yaml';
import request from 'graphql-request';
import { job } from '../gql/job.gql';
import {
  schemaConfigData,
  ChannelSettings,
  ShopifySettings,
  ConnectorType,
} from '../gql/schemaConfig';
import { ConnectorPlugin } from '../..';
import {
  InputEventBusHandleCustomers,
  InputEventBusHandleOrders,
  InputEventBusHandleProducts,
} from '../../types';
import { selector } from '../gql/selector';

export class ShopifyConnector extends ConnectorDefault {
  private synsProductsResult = null as Product | null;
  public name = 'Shopify';
  public type = 'shopify';
  public icon = '/admin/assets/shopify.png';
  public link = 'https://www.shopify.com/free-trial';
  public description =
    'A subscription-based software that allows anyone to set up an online store and sell their products.';
  public schema = {
    type: 'object',
    properties: {
      url: { type: 'string' },
    },
    required: ['url'],
  };
  public layout = [
    {
      key: 'url',
      title: 'Shop url',
      placeholder: 'https://yourshopname.myshopify.com',
      validationMessages: {
        require: 'This field is required.',
      },
      htmlClass: 'form-group',
      fieldHtmlClass: '',
      labelHtmlClass: 'clr-control-label',
    },
  ];
  public data = {
    url: '',
  };

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

  // sync products variant
  async syncProductVariant(
    channel: ChannelSettings<ShopifySettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {
    try {
      Logger.info(`Start product create...`, loggerCtx);
      const { entity, ctx } = event as any;
      const product = (await injector
        .get(TransactionalConnection)
        .getRepository(Product)
        .findOne({
          id: entity[0].productId,
          deletedAt: null,
        })) as unknown as Omit<Translated<Product>, 'customFields'> & {
        customFields: { updated_from: string };
      };
      await injector
        .get(TransactionalConnection)
        .getRepository(Product)
        .update(
          {
            id: product.id,
          },
          {
            customFields: {
              created_from: 'vendure',
              updated_from: 'vendure',
              created_by: ctx.channel.code,
            },
          }
        );
      if (
        product.customFields.updated_from !== '' &&
        product.customFields?.updated_from === this.type
      ) {
        Logger.info(
          `Stop create product! - This action should not be taken`,
          loggerCtx
        );
      } else {
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
            transformFieldName: 'transform_product',
            configFieldName: 'product',
          },
          {
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
                repositoryLocationName: 'data-shopify',
                pipelineName: 'do_create_product',
              }),
            },
          },
        });
        this.handleError(result, this.type, 'created', 'product');
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync product raw update
  async syncProductUpdate(
    channel: ChannelSettings<ShopifySettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {
    try {
      Logger.info(`Start product update...`, loggerCtx);
      const { entity, ctx } = event as any;
      const { req } = ctx;
      const product = (await injector
        .get(TransactionalConnection)
        .getRepository(Product)
        .findOne({
          id: entity.id,
          deletedAt: null,
        })) as unknown as Omit<Translated<Product>, 'customFields'> & {
        customFields: { updated_from: string };
      };
      if (
        product.customFields.updated_from !== '' &&
        product.customFields?.updated_from === this.type
      ) {
        Logger.info(
          `Stop update product! - This action should not be taken`,
          loggerCtx
        );
      } else {
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
            transformFieldName: 'transform_product',
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
                repositoryLocationName: 'data-shopify',
                pipelineName: 'do_update_product',
              }),
            },
          },
        });
        this.handleError(result, this.type, 'updated', 'product');
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync product variants update
  async syncProductVariantsUpdate(
    channel: ChannelSettings<ShopifySettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent,
    injector: Injector
  ): Promise<void> {
    try {
      Logger.info(`Start product variant update...`, loggerCtx);
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
      if (entity[0]?.productId) {
        const product = (await injector
          .get(TransactionalConnection)
          .getRepository(Product)
          .findOne({
            id: entity[0].productId,
            deletedAt: null,
          })) as unknown as Omit<Translated<Product>, 'customFields'> & {
          customFields: { updated_from: string };
        };
        if (
          product.customFields?.updated_from !== '' &&
          product.customFields?.updated_from === this.type
        ) {
          Logger.info(
            `Stop update product variant! - This action should not be taken`,
            loggerCtx
          );
        } else {
          const configData = schemaConfigData(
            {},
            channel,
            connectorType,
            {
              setFieldName: 'set_variants',
              configFieldName: 'variants',
              transformFieldName: 'transform_variants',
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
                  repositoryLocationName: 'data-shopify',
                  pipelineName: 'do_update_variants_product',
                }),
              },
            },
          });
          this.handleError(result, this.type, 'updated', 'product-variant');
        }
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync delete product
  async syncDeleteProduct(
    channel: ChannelSettings<ShopifySettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent,
    injector: Injector
  ) {
    try {
      Logger.info(`Start delete product...`, loggerCtx);
      const { entity } = event as any;
      if (entity[0]?.productId) {
        const product = (await injector
          .get(TransactionalConnection)
          .getRepository(Product)
          .findOne({
            id: entity[0].productId,
          })) as unknown as Omit<Translated<Product>, 'customFields'> & {
          customFields: { updated_from: string };
        };
        if (
          product.customFields.updated_from !== '' &&
          product.customFields.updated_from === this.type
        ) {
          Logger.info(
            `Stop delete product! - This action should not be taken`,
            loggerCtx
          );
        } else {
          const rawConfigData = {
            delete: {
              variants: entity,
            },
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
                  repositoryLocationName: 'data-shopify',
                  pipelineName: 'do_delete_product',
                }),
              },
            },
          });
          this.handleError(result, this.type, 'deleted', 'product');
        }
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync order
  async syncOrder(
    channel: ChannelSettings<ShopifySettings>,
    ConnectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      const { order } = event as any;
      const configData = schemaConfigData(order, channel, connectorType, {
        setFieldName: 'set_order',
        configFieldName: 'order',
      });
      const result = await request({
        url: ConnectorPluginOptions.endpoint,
        document: job,
        variables: {
          executionParams: {
            runConfigData: YAML.stringify(configData),
            selector: selector({
              repositoryName: 'repo',
              repositoryLocationName: 'data-shopify',
              pipelineName: 'do_create_order_shopify',
            }),
          },
        },
      });
      this.handleError(result, this.type, 'created', 'order');
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync customer
  async syncCustomer(
    channel: ChannelSettings<ShopifySettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent,
    injector: Injector
  ) {
    try {
      Logger.info(`Start create customer...`, loggerCtx);
      const { entity, ctx } = event as any;
      await injector
        .get(TransactionalConnection)
        .getRepository(Customer)
        .update(
          { id: entity.id },
          {
            customFields: {
              created_from: 'vendure',
              created_by: ctx.channel.code,
            },
          }
        );
      if (
        entity?.customFields &&
        entity.customFields.updated_from !== '' &&
        entity.customFields.updated_from === this.type
      ) {
        Logger.info(
          `Stop create customer! - This action should not be taken`,
          loggerCtx
        );
      } else {
        const configData = schemaConfigData(entity, channel, connectorType, {
          setFieldName: 'set_customer',
          configFieldName: 'customer',
          transformFieldName: 'transform_customer_shopify',
        });
        const result = await request({
          url: connectorPluginOptions.endpoint,
          document: job,
          variables: {
            executionParams: {
              runConfigData: YAML.stringify(configData),
              selector: selector({
                repositoryName: 'repo',
                repositoryLocationName: 'data-shopify',
                pipelineName: 'do_create_customer_shopify',
              }),
            },
          },
        });
        this.handleError(result, this.type, 'created', 'customer');
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync customer update
  async syncCustomerUpdate(
    channel: ChannelSettings<ShopifySettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      Logger.info(`Start update customer...`, loggerCtx);
      const { entity } = event as any;
      if (
        entity?.customFields &&
        entity.customFields.updated_from !== '' &&
        entity.customFields.updated_from === this.type
      ) {
        Logger.info(
          `Stop update customer! - This action should not be taken`,
          loggerCtx
        );
      } else {
        const configData = schemaConfigData(entity, channel, connectorType, {
          configFieldName: 'customer',
          setFieldName: 'set_customer',
          transformFieldName: 'transform_customer_shopify',
        });
        const result = await request({
          url: connectorPluginOptions.endpoint,
          document: job,
          variables: {
            executionParams: {
              runConfigData: YAML.stringify(configData),
              selector: selector({
                repositoryName: 'repo',
                repositoryLocationName: 'data-shopify',
                pipelineName: 'do_update_customer',
              }),
            },
          },
        });
        this.handleError(result, this.type, 'updated', 'customer');
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync customer delete
  async syncCustomerDelete(
    channel: ChannelSettings<ShopifySettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      Logger.info(`Start delete customer...`, loggerCtx);
      const { entity } = event as any;
      if (
        entity?.customFields &&
        entity.customFields.updated_from !== '' &&
        entity.customFields.updated_from === this.type
      ) {
        Logger.info(
          `Stop delete customer! - This action should not be taken`,
          loggerCtx
        );
      } else {
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
                repositoryLocationName: 'data-shopify',
                pipelineName: 'do_delete_customer',
              }),
            },
          },
        });
        this.handleError(result, this.type, 'deleted', 'customer');
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync customer addresss
  async syncCustomerAddress(
    channel: ChannelSettings<ShopifySettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      Logger.info(`Start create customer address...`, loggerCtx);
      const { entity } = event as any;
      if (
        entity.customer?.customField &&
        entity.customer.customFields.updated_from !== '' &&
        entity.customer.customFields.updated_from === this.type
      ) {
        Logger.info(
          `Stop create customer address! - This action should not be taken`,
          loggerCtx
        );
      } else {
        const configData = schemaConfigData(entity, channel, connectorType, {
          setFieldName: 'set_address_customer',
          configFieldName: 'address',
          transformFieldName: 'transform_address_customer',
        });
        const result = await request({
          url: connectorPluginOptions.endpoint,
          document: job,
          variables: {
            executionParams: {
              runConfigData: YAML.stringify(
                JSON.parse(
                  JSON.stringify(configData, this.getCircularReplacer())
                )
              ),
              selector: selector({
                repositoryName: 'repo',
                repositoryLocationName: 'data-shopify',
                pipelineName: 'do_create_address_customer',
              }),
            },
          },
        });
        this.handleError(result, this.type, 'created', 'customer-address');
      }
    } catch (error) {
      Logger.error(`Failed`, loggerCtx, error as any);
    }
  }

  // sync customer address update
  async syncCustomerAddressUpdate(
    channel: ChannelSettings<ShopifySettings>,
    connectorPluginOptions: ConnectorPluginOptions,
    connectorType: ConnectorType,
    event: VendureEvent
  ) {
    try {
      Logger.info(`Start update customer address...`, loggerCtx);
      const { entity } = event as any;
      if (
        entity.customer?.customField &&
        entity.customer.customFields.updated_from !== '' &&
        entity.customer.customFields.updated_from === this.type
      ) {
        Logger.info(
          `Stop update customer address! - This action should not be taken`,
          loggerCtx
        );
      } else {
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
                JSON.parse(
                  JSON.stringify(configData, this.getCircularReplacer())
                )
              ),
              selector: selector({
                repositoryName: 'repo',
                repositoryLocationName: 'data-shopify',
                pipelineName: 'do_update_address_customer',
              }),
            },
          },
        });
        this.handleError(result, this.type, 'updated', 'customer-address');
      }
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
        await this.syncProducts(input.event, input.injector as Injector);
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
          input.event,
          input.injector
        );
        break;
      case input.eventName === 'ProductVariantEvent' &&
        input.typeEventBus === 'deleted':
        await this.syncDeleteProduct(
          input.channel,
          ConnectorPlugin.options,
          this.type as ConnectorType,
          input.event,
          input.injector
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
          input.event,
          input.injector
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
      default:
        break;
    }
  }
}
