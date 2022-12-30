import {
  AccessMode,
  CurrentSession,
  UseShopifyAuth,
} from '@nestjs-shopify/auth';
import { SHOPIFY_API_CONTEXT } from '@nestjs-shopify/core';
import { Controller, Get, Inject, Req, Res } from '@nestjs/common';
import { Shopify } from '@shopify/shopify-api';
import { restResources } from '@shopify/shopify-api/rest/admin/2022-10';
import { SessionEntity } from './entities';
import { Request, Response } from 'express';
import { Ctx, RequestContext, TransactionalConnection } from '@vendure/core';

// @UseShopifyAuth(AccessMode.Online)
@Controller()
export class ShopifyAppBridgeController {
  constructor(
    @Inject(SHOPIFY_API_CONTEXT)
    private readonly shopifyApi: Shopify<typeof restResources>,
    private readonly connection: TransactionalConnection
  ) {}

  @Get('check-connect')
  async checkConnect(@Ctx() ctx: RequestContext) {
    if (ctx.req?.headers) {
      const session = await this.connection
        .getRepository(SessionEntity)
        .findOne({
          where: {
            id: ctx.req?.headers.sessionid,
          },
        });
      if (session) {
        return await this.shopifyApi.rest.Product.count({ session });
      }
    }
  }
}
