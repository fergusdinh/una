import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import {
  EventBus,
  TransactionalConnection,
  RequestContext,
} from '@vendure/core';

import { FeatureRequestEntity } from '../gql/feature-request.entity';

import { FeatureRequestEvent } from './quoteRequestedHandler';

@Injectable()
export class FeatureRequestService implements OnApplicationBootstrap {
  constructor(
    private eventBus: EventBus,
    private connection: TransactionalConnection
  ) {}

  async createFeatureRequest(
    ctx: RequestContext,
    input: any
  ): Promise<FeatureRequestEntity> {
    await this.eventBus.publish(
      new FeatureRequestEvent(ctx, {
        identifier: input.identifier,
        customFields: {
          description: input.content,
        },
      } as any)
    );
    return this.connection
      .getRepository(ctx, FeatureRequestEntity)
      .save(new FeatureRequestEntity(input));
  }

  async onApplicationBootstrap(): Promise<void> {}
}
