import { EmailEventListener } from '@vendure/email-plugin';
// import { QuoteRequestedEvent } from `./events`;

import {
  RequestContext,
  VendureEvent,
  User,
  NativeAuthenticationMethod,
} from '@vendure/core';

export class FeatureRequestEvent extends VendureEvent {
  constructor(public ctx: RequestContext, public user: User) {
    super();
  }
}

export const mockFeatureRequestEvent = new FeatureRequestEvent(
  {} as any,
  new User({
    verified: false,
    authenticationMethods: [
      new NativeAuthenticationMethod({
        identifier: 'test@test.com',
        verificationToken: 'Hello world',
      }),
    ],
    identifier: 'superadmi1',
    customFields: {
      description: 'Content test',
    },
  })
);

export const quoteRequestedHandler = new EmailEventListener('feature-requested')
  .on(FeatureRequestEvent)
  .setRecipient((event) => event.user.identifier)
  .setFrom(`{{ fromAddress }}`)
  .setSubject(`Here's the Feature requested`)
  .setTemplateVars((event) => ({ content: event.user.customFields }))
  .setMockEvent(mockFeatureRequestEvent);
