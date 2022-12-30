import {
  ShopifyWebhookHandler,
  WebhookHandler,
} from '@nestjs-shopify/webhooks';
import {
  ShopifyCommonWebhookService,
  ShopifyCustomerWebhookService,
} from '../../services';
import { Administrator } from '@vendure/core/dist/entity';
import { Channel, Logger, RequestContext } from '@vendure/core';
import { loggerCtx } from '../../../../constants';
import path from 'path';

@WebhookHandler('CUSTOMERS_UPDATE')
export class CustomersUpdateWebhookHandler extends ShopifyWebhookHandler {
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
      await this.shopifyCustomerWebhookService.updateCustomer(
        ctx as RequestContext,
        data,
        channel as Channel
      );
    } catch (error) {
      const scriptName = path.basename(__filename);
      Logger.error(`${scriptName} --- ${error}`, loggerCtx);
    }
  }
}
