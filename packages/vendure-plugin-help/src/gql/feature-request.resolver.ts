import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import {
  Allow,
  Ctx,
  Permission,
  ProductService,
  RequestContext,
} from '@vendure/core';
import { FeatureRequestService } from '../ui/feature-request.service';

import { FeatureRequestEntity } from './feature-request.entity';

@Resolver()
export class FeatureRequestResolver {
  constructor(
    private featureRequestService: FeatureRequestService,
    private productService: ProductService
  ) {}

  @Mutation()
  // @Allow(Permission.SuperAdmin)
  async addFeatureRequest(
    @Ctx() ctx: RequestContext,
    @Args() args: any
  ): Promise<FeatureRequestEntity | undefined> {
    return await this.featureRequestService.createFeatureRequest(
      ctx,
      args.input
    );
  }
}
