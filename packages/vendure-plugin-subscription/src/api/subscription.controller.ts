import { Response } from 'express';
import { Controller, Post, Res } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import jwt from 'jsonwebtoken';
import {
  Administrator,
  Ctx,
  RequestContext,
  TransactionalConnection,
} from '@vendure/core';

@Controller('sass-subscription')
export class SubscriptionController {
  constructor(
    private subscriptionService: SubscriptionService,
    private connection: TransactionalConnection
  ) {}
  @Post('/webhook')
  async sassSubscriptionWebhook(
    @Ctx() ctx: RequestContext,
    @Res() res: Response
  ) {
    const webhooksPublicKey =
      await this.subscriptionService.webhooksPublicKey();
    const token = ctx?.req && ctx?.req.header('X-Lago-Signature');
    jwt.verify(
      token as string,
      webhooksPublicKey,
      {
        algorithms: ['RS256'],
        issuer: 'http://localhost:3000',
      },
      async () => {
        // disable account when payment failed
        if (ctx?.req?.body?.webhook_type === 'invoice.payment_failure') {
          const externalCustomerId =
            ctx?.req?.body?.payment_provider_invoice_payment_error
              ?.external_customer_id;
          await this.connection
            .getRepository(Administrator)
            .createQueryBuilder('administrator')
            .update<Administrator>(Administrator, {
              customFields: {
                active: false,
              },
            })
            .where('administrator.customFieldsExternal_id_lago = :id', {
              id: externalCustomerId,
            })
            .updateEntity(true)
            .execute();
        }
      }
    );
    return res.send();
  }
}
