// import { DataService } from '@vendure/admin-ui/core';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import {
  Ctx,
  RequestContext,
  ProductVariant,
  TransactionalConnection,
} from '@vendure/core';

@Resolver('SearchResult')
export class FieldOverrideProductVariantResolver {
  constructor(private connection: TransactionalConnection) {}

  @ResolveField()
  async totalVariant(@Ctx() ctx: RequestContext, @Parent() variants: any) {
    return await this.getTotalVariant(ctx, variants);
  }

  checkGroupByProduct(ctx: RequestContext) {
    const subString = 'groupByProduct: true';

    const checkGroupByProduct = JSON.stringify(ctx.req?.body.query).includes(
      subString
    );

    return checkGroupByProduct;
  }

  private async getTotalVariant(
    ctx: RequestContext,
    variants: any
  ): Promise<any> {
    // console.log(ctx.req?.body.query)
    const variantList = await this.connection
      .getRepository(ProductVariant)
      .find({
        productId: variants.productId,
      });

    const totalVariant = variantList.length;

    return totalVariant;
  }

  @ResolveField()
  async totalAvailable(@Ctx() ctx: RequestContext, @Parent() variants: any) {
    return await this.getTotalAvailableVariant(ctx, variants);
  }

  private async getTotalAvailableVariant(
    ctx: RequestContext,
    variants: any
  ): Promise<any> {
    const variantList = await this.connection
      .getRepository(ProductVariant)
      .find({
        id: variants.productVariantId,
      });

    const variantListGroupProduct = this.checkGroupByProduct(ctx)
      ? await this.connection.getRepository(ProductVariant).find({
          productId: variants.productId,
        })
      : null;

    const totalAvailableGroupProduct = this.checkGroupByProduct(ctx)
      ? variantListGroupProduct?.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue.stockOnHand,
          0
        )
      : null;

    const totalAvailable = this.checkGroupByProduct(ctx)
      ? totalAvailableGroupProduct
      : variantList[0]?.stockOnHand;

    return totalAvailable;
  }
}
