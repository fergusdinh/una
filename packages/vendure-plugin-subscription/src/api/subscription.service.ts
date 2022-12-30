import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SubscriptionPlugin } from '../plugin';
import fetch from 'node-fetch';
import request, { Variables } from 'graphql-request';
// import { v4 as uuidv4 } from 'uuid';
import { CURRENT_USER_ORGANIZATIONS_ID, LOGIN_USER } from './gql';

@Injectable()
export class SubscriptionService implements OnApplicationBootstrap {
  token: string = '';
  xLagoOrganization: string = '';
  constructor() {}

  async onApplicationBootstrap(): Promise<void> {
    // check is plugin is disabled
    if (
      SubscriptionPlugin.options === undefined ||
      SubscriptionPlugin?.options?.disabled
    ) {
      return;
    }
    // Token for headers request
    const token = await request({
      url: `${SubscriptionPlugin.options.baseUrl}/graphql`,
      document: LOGIN_USER,
      variables: {
        input: {
          email: SubscriptionPlugin.options.email,
          password: SubscriptionPlugin.options.password,
        },
      },
    });
    this.token = token?.loginUser?.token;
    // Organization id for headers request
    const organizationId = await request({
      url: `${SubscriptionPlugin.options.baseUrl}/graphql`,
      document: CURRENT_USER_ORGANIZATIONS_ID,
      variables: {},
      requestHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });
    this.xLagoOrganization = organizationId?.currentUser?.organizations[0]?.id;
  }

  // Get webhook public
  async webhooksPublicKey() {
    const res = await fetch(
      `${SubscriptionPlugin.options.baseUrl}${SubscriptionPlugin.options.apiPath}/webhooks/public_key`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${SubscriptionPlugin.options.apiKey}`,
        },
      }
    );
    const result = await res.text();
    let buff = new (Buffer as any).from(result, 'base64');
    let key = buff.toString('ascii');
    return key;
  }

  async sassSubscriptionRequest<V = Variables>(
    document: string,
    variables?: V
  ) {
    return await request({
      url: `${SubscriptionPlugin.options.baseUrl}/graphql`,
      document: document,
      variables: variables,
      requestHeaders: {
        Authorization: `Bearer ${this.token}`,
        'x-lago-organization': this.xLagoOrganization,
      },
    });
  }
}
