import {
  ShopifyWebhookHandler,
  WebhookHandler,
} from '@nestjs-shopify/webhooks';
import {
  ShopifyCommonWebhookService,
  ShopifyCustomerWebhookService,
} from '../../services';
import '@shopify/shopify-api/adapters/node';
import { Administrator } from '@vendure/core/dist/entity';
import { Channel, Logger, RequestContext } from '@vendure/core';
import path from 'path';
import { loggerCtx } from '../../../../constants';

@WebhookHandler('CUSTOMERS_CREATE')
export class CustomersCreateWebhookHandler extends ShopifyWebhookHandler {
  constructor(
    private readonly shopifyCommonWebhookService: ShopifyCommonWebhookService,
    private readonly shopifyCustomerWebhookService: ShopifyCustomerWebhookService
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
      await this.shopifyCustomerWebhookService.createCustomer(
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
