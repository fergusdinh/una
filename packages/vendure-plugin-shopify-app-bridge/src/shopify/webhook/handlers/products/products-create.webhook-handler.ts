import {
  ShopifyWebhookHandler,
  WebhookHandler,
} from '@nestjs-shopify/webhooks';
import {
  ShopifyCommonWebhookService,
  ShopifyProductWebhookService,
} from '../../services';
import {
  Channel,
  ID,
  Administrator,
  RequestContext,
  Logger,
} from '@vendure/core';
import path from 'path';
import { loggerCtx } from '../../../../constants';

@WebhookHandler('PRODUCTS_CREATE')
export class ProductsCreateWebhookHandler extends ShopifyWebhookHandler {
  constructor(
    private readonly shopifyCommonWebhookService: ShopifyCommonWebhookService,
    private readonly shopifyProductWebhookService: ShopifyProductWebhookService
  ) {
    super();
  }

  async handle(domain: string, data: any): Promise<void> {
    try {
      /* Check product is existed on vendure */
      const product =
        await this.shopifyCommonWebhookService.findProductByCustomField({
          shopify_product_id: String(data.id),
        });
      if (product) {
        return;
      }
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
      /* Create product */
      await this.shopifyProductWebhookService.createProduct(
        ctx as RequestContext,
        data,
        domain,
        channel as Channel
      );
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }
}
