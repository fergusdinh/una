import { ShopifyWebhooksModule } from '@nestjs-shopify/webhooks';
import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { ConfigModule, ConnectionModule, VendurePlugin } from '@vendure/core';
import { CacheModule } from '@vendure/core/dist/cache/cache.module';
import { DataImportModule } from '@vendure/core/dist/data-import/data-import.module';
import { ServiceCoreModule } from '@vendure/core/dist/service/service.module';
import {
  CustomersCreateWebhookHandler,
  CustomersDeleteWebhookHandler,
  ProductsCreateWebhookHandler,
  ProductsDeleteWebhookHandler,
  ProductsUpdateWebhookHandler,
} from './handlers';
import {
  ShopifyCommonWebhookService,
  ShopifyCustomerWebhookService,
  ShopifyProductWebhookService,
} from './services';
import { CustomersUpdateWebhookHandler } from './handlers/customers/customers-update.webhook.handler';
import { SHOPIFY_WEBHOOK } from '../../constants';

@VendurePlugin({
  imports: [
    ShopifyWebhooksModule.forRoot({
      path: SHOPIFY_WEBHOOK,
    }) as any,
    ServiceCoreModule,
    ConnectionModule,
    ConfigModule,
    DataImportModule,
    CacheModule,
  ],
  providers: [
    ProductsCreateWebhookHandler,
    ProductsDeleteWebhookHandler,
    ProductsUpdateWebhookHandler,
    ShopifyProductWebhookService,
    ShopifyCommonWebhookService,
    CustomersCreateWebhookHandler,
    ShopifyCustomerWebhookService,
    CustomersDeleteWebhookHandler,
    CustomersUpdateWebhookHandler,
  ],
  exports: [
    ProductsCreateWebhookHandler,
    ProductsDeleteWebhookHandler,
    ProductsUpdateWebhookHandler,
    CustomersCreateWebhookHandler,
    CustomersDeleteWebhookHandler,
    CustomersUpdateWebhookHandler,
  ],
})
export class WebhooksModule {}
