import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  Channel,
  FastImporterService,
  ID,
  Logger,
  Product,
  ProductOption,
  ProductOptionGroup,
  ProductOptionGroupService,
  ProductOptionService,
  ProductService,
  ProductVariant,
  ProductVariantService,
  RequestContext,
  TaxCategory,
  TaxCategoryService,
  TransactionalConnection,
  Translated,
} from '@vendure/core';
import {
  OptionProductShopify,
  ProductsCreateWebhookShopify,
} from '../../types';
import { UpdateProductVariantInput } from '@vendure/common/lib/generated-types';
import path from 'path';
import { loggerCtx } from '../../../../constants';

@Injectable()
export class ShopifyProductWebhookService implements OnApplicationBootstrap {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly productService: ProductService,
    private readonly productOptionService: ProductOptionService,
    private readonly productOptionGroupService: ProductOptionGroupService,
    private readonly productVariantService: ProductVariantService,
    private readonly fastImporterService: FastImporterService,
    private readonly taxCategoryService: TaxCategoryService
  ) {}

  async onApplicationBootstrap(): Promise<void> {}

  async createProduct<P extends ProductsCreateWebhookShopify>(
    ctx: RequestContext,
    data: P,
    domain: string,
    channel: Channel
  ): Promise<Product | undefined> {
    try {
      let isCreateProduct: boolean = false;
      const isExistVariant = await this.connection
        .getRepository(ProductVariant)
        .findOne({
          deletedAt: null,
          sku: data.variants[0].sku,
        });
      if (isExistVariant) {
        const isExistProduct = await this.connection
          .getRepository(Product)
          .findOne({
            id: isExistVariant.productId,
            deletedAt: null,
          });
        if (isExistProduct) {
          isCreateProduct = true;
          await this.connection.getRepository(Product).update(
            {
              id: isExistProduct.id,
            },
            {
              customFields: {
                shopify_product_id: String(data.id),
              },
            }
          );
        }
      }
      if (!isCreateProduct) {
        const product = await this.productService.create(ctx, {
          customFields: {
            shopify_product_id: String(data.id),
            created_from: domain,
            created_by: domain,
            updated_from: 'shopify',
          },
          enabled: data.status === 'active',
          translations: [
            {
              name: data.title,
              slug: data.title.replace(/\s/g, '-').toLowerCase(),
              description: data.body_html,
              languageCode: channel.defaultLanguageCode,
            },
          ],
        });
        const productOptionGroups = (await this.createProductOptionGroup(
          ctx,
          data,
          product,
          channel
        )) as ProductOptionGroup[];
        for (const productOptionGroup of productOptionGroups) {
          await this.productService.addOptionGroupToProduct(
            ctx,
            product.id,
            productOptionGroup.id
          );
        }
        const productOptions = await this.createProductOption(
          ctx,
          data,
          productOptionGroups as ProductOptionGroup[],
          channel
        );
        await this.createProductVariants(
          ctx,
          data,
          product,
          channel,
          productOptions as ProductOption[]
        );
        return product;
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  public async createProductOptionGroup<P extends ProductsCreateWebhookShopify>(
    ctx: RequestContext,
    data: P,
    product: Product,
    channel: Channel
  ): Promise<ProductOptionGroup[] | undefined> {
    try {
      const productOptionGroups: ProductOptionGroup[] = [];
      for (const option of data.options) {
        productOptionGroups.push(
          await this.productOptionGroupService.create(ctx, {
            code: product.name + '-' + option.name.toUpperCase(),
            options: [],
            translations: [
              {
                languageCode: channel.defaultLanguageCode,
                name: option.name,
              },
            ],
            customFields: {
              shopify_product_option_group_id: String(option.id),
              shopify_product_id: String(option.product_id),
            },
          })
        );
      }
      return productOptionGroups;
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  public async createProductOption<P extends ProductsCreateWebhookShopify>(
    ctx: RequestContext,
    data: P,
    productOptionGroups: ProductOptionGroup[],
    channel: Channel
  ): Promise<ProductOption[] | undefined> {
    try {
      const productOptions: ProductOption[] = [];
      for (const productOptionGroup of productOptionGroups) {
        const iProductOptionGroup = productOptionGroup as unknown as Omit<
          ProductOptionGroup,
          'customFields'
        > & { customFields: { shopify_product_option_group_id: string } };
        for (const option of data.options) {
          if (productOptionGroup.name === option.name) {
            for (let i = 0; i < option.values.length; i++) {
              productOptions.push(
                await this.productOptionService.create(
                  ctx,
                  iProductOptionGroup,
                  {
                    code: option.values[i].replace(/\s/g, '-').toLowerCase(),
                    productOptionGroupId: iProductOptionGroup.id,
                    translations: [
                      {
                        languageCode: channel.defaultLanguageCode,
                        name: option.values[i],
                      },
                    ],
                    customFields: {
                      shopify_product_option_group_id:
                        iProductOptionGroup.customFields
                          .shopify_product_option_group_id,
                      shopify_product_id: String(option.product_id),
                    },
                  }
                )
              );
            }
          }
        }
      }
      return productOptions;
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  public async createProductVariants<P extends ProductsCreateWebhookShopify>(
    ctx: RequestContext,
    data: P,
    product: Product,
    channel: Channel,
    productOptions: ProductOption[]
  ): Promise<void> {
    try {
      const taxCategory = (await this.connection
        .getRepository(TaxCategory)
        .findOne({ isDefault: true })) as TaxCategory;
      const isExistTaxCategory = await this.getTaxCategoryForNewVariant(
        ctx,
        taxCategory?.id
      );
      for (const variant of data.variants) {
        const optionIds: ID[] = [];
        for (const productOption of productOptions) {
          for (const variantOption of [
            ...(variant.option1 ? [variant.option1] : []),
            ...(variant.option2 ? [variant.option2] : []),
            ...(variant.option3 ? [variant.option3] : []),
          ]) {
            if (variantOption === productOption.name) {
              optionIds.push(productOption.id);
            }
          }
        }
        await this.fastImporterService.initialize(channel);
        await this.fastImporterService.createProductVariant({
          productId: product.id,
          sku: variant.sku,
          price: +variant.price,
          optionIds,
          stockOnHand: variant.inventory_quantity,
          useGlobalOutOfStockThreshold: true,
          taxCategoryId: isExistTaxCategory?.id,
          translations: [
            {
              customFields: {},
              languageCode: channel.defaultLanguageCode,
              name: product.name + ' ' + variant.title,
            },
          ],
          customFields: {
            shopify_product_variant_id: String(variant.id),
            shopify_product_id: String(variant.product_id),
          },
        });
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  public async deleteProduct(
    ctx: RequestContext,
    productShopifyId: number
  ): Promise<void> {
    try {
      await this.productService.softDelete(ctx, productShopifyId);
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  public async updateProduct<P extends ProductsCreateWebhookShopify>(
    ctx: RequestContext,
    productId: ID,
    data: P,
    channel: Channel
  ): Promise<Translated<Product> | undefined> {
    try {
      let isUpdateProduct: boolean = false;
      const isExistVariant = await this.connection
        .getRepository(ProductVariant)
        .findOne({
          deletedAt: null,
          sku: data.variants[0].sku,
        });
      if (isExistVariant) {
        const isExistProduct = (await this.connection
          .getRepository(Product)
          .findOne({
            id: isExistVariant.productId,
            deletedAt: null,
          })) as unknown as Omit<Translated<Product>, 'customFields'> & {
          customFields: { updated_from: string };
        };
        if (isExistProduct) {
          if (isExistProduct.customFields.updated_from === 'vendure') {
            isUpdateProduct = true;
            for (const variant of data.variants) {
              await this.connection.getRepository(ProductVariant).update(
                {
                  sku: variant.sku,
                },
                {
                  customFields: {
                    shopify_product_variant_id: String(variant.id),
                    shopify_product_id: String(variant.product_id),
                  },
                }
              );
            }
          }
        }
      }
      if (!isUpdateProduct) {
        const product = await this.productService.update(ctx, {
          id: productId,
          enabled: data.status === 'active',
          translations: [
            {
              customFields: {},
              name: data.title,
              slug: data.title.replace(/\s/g, '-').toLowerCase(),
              description: data.body_html,
              languageCode: channel.defaultLanguageCode,
            },
          ],
        });
        await this.updateProductOptionGroupAndProductOption(
          ctx,
          data,
          product,
          channel
        );
        await this.updateProductVariant(ctx, data, product, channel);
        return product;
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  public async updateProductOptionGroupAndProductOption<
    P extends ProductsCreateWebhookShopify
  >(
    ctx: RequestContext,
    data: P,
    product: Product,
    channel: Channel
  ): Promise<void | undefined> {
    try {
      const productOptionGroupsAvailable = await this.connection
        .getRepository(ProductOptionGroup)
        .find({
          deletedAt: null,
          product: {
            id: product?.id,
          },
        });
      if (data.options[0].name === 'Title') {
        for (const productOptionGroupAvailable of productOptionGroupsAvailable) {
          const iProductOptionGroupAvailable =
            productOptionGroupAvailable as unknown as Omit<
              Translated<ProductOptionGroup>,
              'customFields'
            > & { customFields: { shopify_product_option_group_id: string } };
          // Get all product option of product.
          const productOptions = await this.connection
            .getRepository(ProductOption)
            .find({
              customFields: {
                shopify_product_option_group_id:
                  iProductOptionGroupAvailable.customFields
                    .shopify_product_option_group_id,
              },
              deletedAt: null,
            });
          // Delete product options.
          for (const productOption of productOptions) {
            // Delete protudct variants of product.
            const productVariants = await this.connection
              .getRepository(ProductVariant)
              .createQueryBuilder('product_variant')
              .innerJoin('product_variant.options', 'options')
              .where('options.id = :id', { id: productOption?.id })
              .getMany();
            await this.productVariantService.softDelete(
              ctx,
              productVariants.map((productVariant) => productVariant?.id)
            );
            await this.connection.getRepository(ctx, ProductOption).save(
              {
                ...productOption,
                deletedAt: new Date(),
              },
              { reload: false }
            );
          }
          const optionGroup = await this.connection.getEntityOrThrow(
            ctx,
            ProductOptionGroup,
            productOptionGroupAvailable?.id,
            {
              where: { deletedAt: null },
              relations: ['options', 'product'],
            }
          );
          // Delete product option group.
          optionGroup.deletedAt = new Date();
          await this.connection
            .getRepository(ctx, ProductOptionGroup)
            .save(optionGroup, { reload: false });
        }
        // Create new product option group.
        const productOptionGroup = (await this.productOptionGroupService.create(
          ctx,
          {
            code: product.name + '-' + data.options[0].name.toLowerCase(),
            options: [],
            translations: [
              {
                languageCode: channel.defaultLanguageCode,
                name: data.options[0].name,
              },
            ],
            customFields: {
              shopify_product_option_group_id: String(data.options[0].id),
              shopify_product_id: String(data.options[0].product_id),
            },
          }
        )) as unknown as Omit<
          Translated<ProductOptionGroup>,
          'customFields'
        > & { customFields: { shopify_product_option_group_id: string } };
        // create new product option.
        const productOptions: ProductOption[] = [];
        for (const option of data.options) {
          if (productOptionGroup.name === option.name) {
            for (let i = 0; i < option.values.length; i++) {
              productOptions.push(
                await this.productOptionService.create(
                  ctx,
                  productOptionGroup,
                  {
                    code: option.values[i].replace(/\s/g, '-').toLowerCase(),
                    productOptionGroupId: productOptionGroup?.id,
                    translations: [
                      {
                        languageCode: channel.defaultLanguageCode,
                        name: option.values[i],
                      },
                    ],
                    customFields: {
                      shopify_product_option_group_id:
                        productOptionGroup.customFields
                          .shopify_product_option_group_id,
                      shopify_product_id: String(option.product_id),
                    },
                  }
                )
              );
            }
          }
        }
        await this.productService.addOptionGroupToProduct(
          ctx,
          product.id,
          productOptionGroup?.id
        );
        // create new product variants
        const taxCategory = (await this.connection
          .getRepository(TaxCategory)
          .findOne({ isDefault: true })) as TaxCategory;
        const isExistTaxCategory = await this.getTaxCategoryForNewVariant(
          ctx,
          taxCategory?.id
        );
        await this.fastImporterService.initialize(channel);
        await this.fastImporterService.createProductVariant({
          productId: product.id,
          sku: data.variants[0].sku,
          price: +data.variants[0].price,
          optionIds: productOptions.map((productOption) => productOption.id),
          stockOnHand: data.variants[0].inventory_quantity,
          useGlobalOutOfStockThreshold: true,
          taxCategoryId: isExistTaxCategory?.id,
          translations: [
            {
              customFields: {},
              languageCode: channel.defaultLanguageCode,
              name: product.name + ' ' + data.variants[0].title,
            },
          ],
          customFields: {
            shopify_product_variant_id: String(data.variants[0].id),
            shopify_product_id: String(data.variants[0].product_id),
          },
        });
      }
      if (data.options.length < productOptionGroupsAvailable.length) {
        const productOptionGroupsDelete = productOptionGroupsAvailable.filter(
          (productOptionGroupAvailable) => {
            const iProductOptionGroupAvailable =
              productOptionGroupAvailable as unknown as Omit<
                Translated<ProductOptionGroup>,
                'customFields'
              > & { customFields: { shopify_product_option_group_id: string } };
            return !data.options.find(
              (option) =>
                String(option.id) ===
                iProductOptionGroupAvailable.customFields
                  .shopify_product_option_group_id
            );
          }
        );
        for (const productOptionGroupDelete of productOptionGroupsDelete) {
          const iProductOptionGroupDelete =
            productOptionGroupDelete as unknown as Omit<
              Translated<ProductOptionGroup>,
              'customFields'
            > & { customFields: { shopify_product_option_group_id: string } };
          const optionGroup = await this.connection.getEntityOrThrow(
            ctx,
            ProductOptionGroup,
            productOptionGroupDelete.id,
            {
              where: { deletedAt: null },
              relations: ['options', 'product'],
            }
          );
          optionGroup.deletedAt = new Date();
          await this.connection
            .getRepository(ctx, ProductOptionGroup)
            .save(optionGroup, { reload: false });
          const productOptions = await this.connection
            .getRepository(ProductOption)
            .find({
              customFields: {
                shopify_product_option_group_id:
                  iProductOptionGroupDelete.customFields
                    .shopify_product_option_group_id,
              },
              deletedAt: null,
            });
          for (const productOption of productOptions) {
            await this.connection.getRepository(ctx, ProductOption).save(
              {
                ...productOption,
                deletedAt: new Date(),
              },
              { reload: false }
            );
          }
        }
      } else if (data.options.length > productOptionGroupsAvailable.length) {
        const productOptionGroupsCreate = data.options.filter((option) => {
          return !productOptionGroupsAvailable.find(
            (productOptionGroupAvailable) => {
              const iProductOptionGroupAvailable =
                productOptionGroupAvailable as unknown as Omit<
                  Translated<ProductOptionGroup>,
                  'customFields'
                > & {
                  customFields: { shopify_product_option_group_id: string };
                };
              return (
                String(option.id) ===
                iProductOptionGroupAvailable.customFields
                  .shopify_product_option_group_id
              );
            }
          );
        });
        for (const productOptionGroupCreate of productOptionGroupsCreate) {
          const productOptionGroup =
            await this.productOptionGroupService.create(ctx, {
              code:
                product.name +
                '-' +
                productOptionGroupCreate.name.toLowerCase(),
              options: [],
              translations: [
                {
                  languageCode: channel.defaultLanguageCode,
                  name: productOptionGroupCreate.name,
                },
              ],
              customFields: {
                shopify_product_option_group_id: String(
                  productOptionGroupCreate.id
                ),
                shopify_product_id: String(productOptionGroupCreate.product_id),
              },
            });
          for (let i = 0; i < productOptionGroupCreate.values.length; i++) {
            await this.productOptionService.create(ctx, productOptionGroup.id, {
              code: productOptionGroupCreate.values[i]
                .replace(/\s/g, '-')
                .toLowerCase(),
              productOptionGroupId: productOptionGroup.id,
              translations: [
                {
                  languageCode: channel.defaultLanguageCode,
                  name: productOptionGroupCreate.values[i],
                },
              ],
              customFields: {
                shopify_product_option_group_id: String(
                  productOptionGroupCreate.id
                ),
                shopify_product_id: String(productOptionGroupCreate.product_id),
              },
            });
          }
          await this.productService.addOptionGroupToProduct(
            ctx,
            product.id,
            productOptionGroup.id
          );
        }
      } else {
        for (const productOptionGroupAvailable of productOptionGroupsAvailable) {
          for (const option of data.options) {
            const productOptionGroup = (await this.connection
              .getRepository(ProductOptionGroup)
              .findOne({
                customFields: {
                  shopify_product_option_group_id: String(option.id),
                },
                deletedAt: null,
              })) as ProductOptionGroup;
            if (productOptionGroup.id === productOptionGroupAvailable.id) {
              await this.productOptionGroupService.update(ctx, {
                id: productOptionGroupAvailable.id,
                code: product.name + '-' + option.name.toLowerCase(),
                translations: [
                  {
                    languageCode: channel.defaultLanguageCode,
                    name: option.name,
                  },
                ],
              });
              const productOptions = (await this.connection
                .getRepository(ProductOption)
                .find({
                  group: { id: productOptionGroup.id },
                  deletedAt: null,
                })) as Translated<ProductOption>[];
              if (option.values.length > productOptions.length) {
                // Update before create new
                await this.updateProductOptionsByActions(
                  ctx,
                  option,
                  productOptions,
                  channel
                );
                const productOptionsAfterUpdate = (await this.connection
                  .getRepository(ProductOption)
                  .find({
                    group: { id: productOptionGroup.id },
                    deletedAt: null,
                  })) as Translated<ProductOption>[];
                const optionsCreate = option.values.filter(
                  (opt: string) =>
                    !productOptionsAfterUpdate.find(
                      (productOptionAfterUpdate) =>
                        opt === productOptionAfterUpdate.code
                    )
                );
                for (let i = 0; i < optionsCreate.length; i++) {
                  await this.productOptionService.create(
                    ctx,
                    productOptionGroup.id,
                    {
                      code: optionsCreate[i].replace(/\s/g, '-').toLowerCase(),
                      productOptionGroupId: productOptionGroup.id,
                      translations: [
                        {
                          languageCode: channel.defaultLanguageCode,
                          name: optionsCreate[i],
                        },
                      ],
                      customFields: {
                        shopify_product_option_group_id: String(option.id),
                        shopify_product_id: String(option.product_id),
                      },
                    }
                  );
                }
                await this.updateProductOptionGroupAndProductOption(
                  ctx,
                  data,
                  product,
                  channel
                );
              } else if (option.values.length < productOptions.length) {
                // Update before delete
                await this.updateProductOptionsByActions(
                  ctx,
                  option,
                  productOptions,
                  channel
                );
                const productOptionsAfterUpdate = (await this.connection
                  .getRepository(ProductOption)
                  .find({
                    group: { id: productOptionGroup.id },
                    deletedAt: null,
                  })) as Translated<ProductOption>[];
                const optionsDelete = productOptionsAfterUpdate.filter(
                  (productOptionAfterUpdate) =>
                    !option.values.find(
                      (opt: string) => opt === productOptionAfterUpdate.code
                    )
                );
                for (const optionDelete of optionsDelete) {
                  await this.connection.getRepository(ProductOption).save(
                    {
                      ...optionDelete,
                      deletedAt: new Date(),
                    },
                    { reload: false }
                  );
                }
                await this.updateProductOptionGroupAndProductOption(
                  ctx,
                  data,
                  product,
                  channel
                );
              } else {
                await this.updateProductOptionsByActions(
                  ctx,
                  option,
                  productOptions,
                  channel
                );
              }
            }
          }
        }
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  public async updateProductVariant<P extends ProductsCreateWebhookShopify>(
    ctx: RequestContext,
    data: P,
    product: Product,
    channel: Channel
  ): Promise<void> {
    try {
      const productVariantsAvailable = (await this.connection
        .getRepository(ProductVariant)
        .find({
          where: {
            customFields: { shopify_product_id: String(data.id) },
            deletedAt: null,
          },
        })) as Translated<ProductVariant>[];
      if (data.variants.length > productVariantsAvailable.length) {
        const taxCategory = (await this.connection
          .getRepository(TaxCategory)
          .findOne({ isDefault: true })) as TaxCategory;
        const isExistTaxCategory = await this.getTaxCategoryForNewVariant(
          ctx,
          taxCategory?.id
        );
        const productOptions = await this.connection
          .getRepository(ProductOption)
          .find({
            where: {
              customFields: { shopify_product_id: String(data.id) },
              deletedAt: null,
            },
          });
        await this.updateProductVariantsByActions(
          ctx,
          data,
          product,
          productVariantsAvailable,
          channel
        );
        const productVariantsAvailableAfterUpdate = (await this.connection
          .getRepository(ProductVariant)
          .find({
            where: {
              customFields: { shopify_product_id: String(data.id) },
              deletedAt: null,
            },
          })) as Translated<ProductVariant>[];
        const productVariantsCreate = data.variants.filter((variant) => {
          return !productVariantsAvailableAfterUpdate.find(
            (productVariantAvailableAfterUpdate) => {
              const iProductVariantAvailableAfterUpdate =
                productVariantAvailableAfterUpdate as unknown as Omit<
                  Translated<ProductVariant>,
                  'customFields'
                > & { customFields: { shopify_product_variant_id: string } };
              return (
                iProductVariantAvailableAfterUpdate.customFields
                  .shopify_product_variant_id === String(variant.id)
              );
            }
          );
        });
        for (const productVariantCreate of productVariantsCreate) {
          const optionIds: ID[] = [];
          for (const productOption of productOptions) {
            for (const variantOption of [
              ...(productVariantCreate.option1
                ? [productVariantCreate.option1]
                : []),
              ...(productVariantCreate.option2
                ? [productVariantCreate.option2]
                : []),
              ...(productVariantCreate.option3
                ? [productVariantCreate.option3]
                : []),
            ]) {
              if (variantOption === productOption.code) {
                optionIds.push(productOption.id);
              }
            }
          }
          await this.fastImporterService.initialize(channel);
          await this.fastImporterService.createProductVariant({
            productId: product.id,
            sku: productVariantCreate.sku,
            price: +productVariantCreate.price,
            optionIds,
            stockOnHand: productVariantCreate.inventory_quantity,
            useGlobalOutOfStockThreshold: true,
            taxCategoryId: isExistTaxCategory?.id,
            translations: [
              {
                customFields: {},
                languageCode: channel.defaultLanguageCode,
                name: product.name + ' ' + productVariantCreate.title,
              },
            ],
            customFields: {
              shopify_product_variant_id: String(productVariantCreate.id),
              shopify_product_id: String(productVariantCreate.product_id),
            },
          });
        }
        await this.updateProductVariant(ctx, data, product, channel);
      } else if (data.variants.length < productVariantsAvailable.length) {
        await this.updateProductVariantsByActions(
          ctx,
          data,
          product,
          productVariantsAvailable,
          channel
        );
        const productVariantsAvailableAfterUpdate = (await this.connection
          .getRepository(ProductVariant)
          .find({
            where: {
              customFields: { shopify_product_id: String(data.id) },
              deletedAt: null,
            },
          })) as Translated<ProductVariant>[];
        const productVariantsDelete =
          productVariantsAvailableAfterUpdate.filter(
            (productVariantAvailableAfterUpdate) => {
              const iProductVariantsAvailableAfterUpdate =
                productVariantAvailableAfterUpdate as unknown as Omit<
                  Translated<ProductVariant>,
                  'customFields'
                > & { customFields: { shopify_product_variant_id: string } };
              return !data.variants.find(
                (variant) =>
                  iProductVariantsAvailableAfterUpdate.customFields
                    .shopify_product_variant_id === String(variant.id)
              );
            }
          );
        await this.productVariantService.softDelete(
          ctx,
          productVariantsDelete.map((productVariantDelete) => {
            return productVariantDelete.id;
          })
        );
        await this.updateProductVariant(ctx, data, product, channel);
      } else {
        await this.updateProductVariantsByActions(
          ctx,
          data,
          product,
          productVariantsAvailable,
          channel
        );
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  private async updateProductOptionsByActions(
    ctx: RequestContext,
    option: OptionProductShopify,
    productOptions: ProductOption[],
    channel: Channel
  ): Promise<void> {
    try {
      for (const [
        indexProductOption,
        productOption,
      ] of productOptions.entries()) {
        const iProductOption = productOption as unknown as Omit<
          Translated<ProductOption>,
          'customFields'
        > & { customFields: { shopify_product_option_group_id: string } };
        if (
          iProductOption.customFields.shopify_product_option_group_id ===
          String(option.id)
        ) {
          for (const [indexValue, value] of option.values.entries()) {
            if (
              iProductOption.code !== value &&
              indexProductOption === indexValue
            ) {
              await this.productOptionService.update(ctx, {
                id: iProductOption.id,
                code: value.replace(/\s/g, '-').toLowerCase(),
                translations: [
                  {
                    languageCode: channel.defaultLanguageCode,
                    name: value,
                  },
                ],
              });
            }
          }
        }
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  private async updateProductVariantsByActions<
    P extends ProductsCreateWebhookShopify
  >(
    ctx: RequestContext,
    data: P,
    product: Product,
    productVariantsAvailable: ProductVariant[],
    channel: Channel
  ): Promise<void> {
    try {
      const taxCategory = (await this.connection
        .getRepository(TaxCategory)
        .findOne({ isDefault: true })) as TaxCategory;
      const isExistTaxCategory = await this.getTaxCategoryForNewVariant(
        ctx,
        taxCategory?.id
      );
      const updateProductVariantInput: UpdateProductVariantInput[] = [];
      for (const variant of data.variants) {
        for (const productVariantAvailable of productVariantsAvailable) {
          const iProductVariantAvailable =
            productVariantAvailable as unknown as Omit<
              Translated<ProductVariant>,
              'customFields'
            > & { customFields: { shopify_product_variant_id: string } };
          if (
            iProductVariantAvailable.customFields.shopify_product_variant_id ===
            String(variant.id)
          ) {
            updateProductVariantInput.push({
              id: iProductVariantAvailable.id,
              sku: variant.sku,
              price: +variant.price,
              stockOnHand: variant.inventory_quantity,
              useGlobalOutOfStockThreshold: true,
              taxCategoryId: isExistTaxCategory?.id,
              translations: [
                {
                  languageCode: channel.defaultLanguageCode,
                  name: product.name + ' ' + variant.title,
                },
              ],
            });
          }
        }
      }
      await this.productVariantService.update(ctx, updateProductVariantInput);
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(
        `${scriptName} --- ${error}`,
        loggerCtx,
        error as string | undefined
      );
    }
  }

  private async getTaxCategoryForNewVariant(
    ctx: RequestContext,
    taxCategoryId: ID | null | undefined
  ): Promise<TaxCategory> {
    let taxCategory: TaxCategory;
    if (taxCategoryId) {
      taxCategory = await this.connection.getEntityOrThrow(
        ctx,
        TaxCategory,
        taxCategoryId
      );
    } else {
      const taxCategories = await this.taxCategoryService.findAll(ctx);
      taxCategory = taxCategories.find((t) => t.isDefault) ?? taxCategories[0];
    }
    if (!taxCategory) {
      // there is no TaxCategory set up, so create a default
      taxCategory = await this.taxCategoryService.create(ctx, {
        name: 'Standard Tax',
      });
    }
    return taxCategory;
  }
}
