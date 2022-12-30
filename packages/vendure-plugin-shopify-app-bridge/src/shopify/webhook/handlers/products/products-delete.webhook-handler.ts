import {
  ShopifyWebhookHandler,
  WebhookHandler,
} from '@nestjs-shopify/webhooks';
import {
  ShopifyCommonWebhookService,
  ShopifyProductWebhookService,
} from '../../services';
import { Product, RequestContextService, Logger } from '@vendure/core';
import { ProductsDeleteWebhookShopify } from '../../types';
import { loggerCtx } from '../../../../constants';
import path from 'path';

@WebhookHandler('PRODUCTS_DELETE')
export class ProductsDeleteWebhookHandler extends ShopifyWebhookHandler {
  constructor(
    private readonly shopifyCommonWebhookService: ShopifyCommonWebhookService,
    private readonly shopifyProductWebhookService: ShopifyProductWebhookService,
    private readonly requestContextService: RequestContextService
  ) {
    super();
  }

  async handle(
    domain: string,
    data: ProductsDeleteWebhookShopify
  ): Promise<void> {
    try {
      /* Get channel */
      const channel =
        await this.shopifyCommonWebhookService.getChannelByShopDomain(domain);
      /* Get shopper */
      const shopper =
        await this.shopifyCommonWebhookService.getShopperByShopDomain(domain);
      /* Create ctx */
      const ctx = await this.requestContextService.create({
        apiType: 'admin',
        channelOrToken: channel,
        user: shopper?.user,
        languageCode: channel?.defaultLanguageCode,
      });
      /* Get product need delete by id from shopify */
      const product =
        (await this.shopifyCommonWebhookService.findProductByCustomField({
          shopify_product_id: String(data.id),
        })) as Product;
      /* Delete product */
      if (product) {
        await this.shopifyProductWebhookService.deleteProduct(
          ctx,
          product.id as number
        );
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }
}
