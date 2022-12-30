import {
  ShopifyWebhookHandler,
  WebhookHandler,
} from '@nestjs-shopify/webhooks';
import { ShopifyCommonWebhookService } from '../../services/common';
import { ShopifyProductWebhookService } from '../../services/products';
import { Channel, Product, RequestContext, Logger } from '@vendure/core';
import { Administrator } from '@vendure/core/dist/entity';
import { loggerCtx } from '../../../../constants';
import path from 'path';

@WebhookHandler('PRODUCTS_UPDATE')
export class ProductsUpdateWebhookHandler extends ShopifyWebhookHandler<unknown> {
  constructor(
    private readonly shopifyCommonWebhookService: ShopifyCommonWebhookService,
    private readonly shopifyProductWebhookService: ShopifyProductWebhookService
  ) {
    super();
  }

  async handle(domain: string, data: any): Promise<void> {
    try {
      /* Get channel */
      const channel =
        await this.shopifyCommonWebhookService.getChannelByShopDomain(domain);
      /* Get shopper */
      const shopper =
        await this.shopifyCommonWebhookService.getShopperByShopDomain(domain);
      /* Create ctx */
      const ctx = await this.shopifyCommonWebhookService.createCtx(
        shopper as Administrator,
        channel as Channel,
        'admin'
      );
      /* Find product is exsit on vendure if not return */
      const product =
        await this.shopifyCommonWebhookService.findProductByCustomField({
          shopify_product_id: String(data.id),
        });
      if (!product) {
        return;
      } else {
        /* Update product */
        await this.shopifyProductWebhookService.updateProduct(
          ctx as RequestContext,
          product.id,
          data,
          channel as Channel
        );
      }
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }
}
