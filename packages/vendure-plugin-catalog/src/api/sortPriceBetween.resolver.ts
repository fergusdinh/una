// import { DataService } from '@vendure/admin-ui/core';
import { Parent, ResolveField, Resolver, Args, Query } from '@nestjs/graphql';
import {
  Allow,
  Ctx,
  RequestContext,
  TransactionalConnection,
  Permission,
} from '@vendure/core';
// import { SearchStrategy } from '@vendure/core/dist/plugin/default-search-plugin/search-strategy/search-strategy';
// import { FulltextSearchService } from '@vendure/core/dist/plugin/'

@Resolver('SearchResponse')
export class FieldOverrideSortResolver {
  constructor(private connection: TransactionalConnection) {}

  @Query()
  async searchCustom(@Ctx() ctx: RequestContext, @Args() args: any) {
    return await this.getSearchCustom(ctx, args);
  }

  private async getSearchCustom(ctx: RequestContext, args: any): Promise<any> {
    return 'hello';
  }
  // @Query()
  // @Allow(Permission.ReadCatalog, Permission.ReadProduct)
  // async search(@Ctx() ctx: RequestContext, @Args() args: any) {
  //   console.log('args---------', args)
  //   // const result = await this.fulltextSearchService.search(ctx, args.input, false);
  //   let items = {
  //     sku: 'world'
  //   }
  //   let totalItems = 25
  //   // ensure the facetValues property resolver has access to the input args
  //   // (result as any).input = args.input;
  //   return {
  //     items,
  //     totalItems,
  //   };
  // }
}
