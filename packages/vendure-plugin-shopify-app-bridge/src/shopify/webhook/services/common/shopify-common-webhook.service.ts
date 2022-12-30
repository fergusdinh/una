import { Injectable } from '@nestjs/common';
import { OnApplicationBootstrap } from '@nestjs/common';
import {
  TransactionalConnection,
  Channel,
  Administrator,
  Product,
  RequestContextService,
  RequestContext,
  RequestContextCacheService,
  ConfigService,
  ZoneService,
  Order,
} from '@vendure/core';
import { ApiType } from '@vendure/core/dist/api/common/get-api-type';

@Injectable()
export class ShopifyCommonWebhookService implements OnApplicationBootstrap {
  constructor(
    private readonly connection: TransactionalConnection,
    private readonly requestContextService: RequestContextService,
    private readonly requestContextCache: RequestContextCacheService,
    private readonly configService: ConfigService,
    private readonly zoneService: ZoneService
  ) {}

  async onApplicationBootstrap(): Promise<void> {}

  public async getChannelByShopDomain(
    shopDomain: string
  ): Promise<Channel | undefined> {
    try {
      return await this.connection.getRepository(Channel).findOne({
        customFields: {
          shopify_domain: shopDomain,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getShopperByShopDomain(
    shopDomain: string
  ): Promise<Administrator | undefined> {
    try {
      return await this.connection.getRepository(Administrator).findOne({
        customFields: {
          shopify_domain: shopDomain,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async findProductByCustomField<CF extends {}>(
    findByCustomFields: CF
  ): Promise<Product | undefined> {
    try {
      const product = await this.connection.getRepository(Product).findOne({
        customFields: {
          ...findByCustomFields,
        },
        deletedAt: null,
      });
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  public async createCtx(
    shopper: Administrator,
    channel: Channel,
    apiType: ApiType
  ): Promise<RequestContext | undefined> {
    try {
      const ctx = await this.requestContextService.create({
        apiType,
        channelOrToken: channel,
        user: shopper?.user,
        languageCode: channel?.defaultLanguageCode,
      });
      await this.createActiveTaxZone(ctx);
      return ctx;
    } catch (error) {
      console.log(error);
    }
  }

  public async createActiveTaxZone(ctx: RequestContext, order?: Order) {
    try {
      const { taxZoneStrategy } = this.configService.taxOptions;
      const zones = await this.zoneService.findAll(ctx);
      this.requestContextCache.set(ctx, 'activeTaxZone', () => {
        return taxZoneStrategy.determineTaxZone(ctx, zones, ctx.channel, order);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
