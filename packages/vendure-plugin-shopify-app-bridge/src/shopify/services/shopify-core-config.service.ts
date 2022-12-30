import { Inject, Injectable } from '@nestjs/common';
import { ShopifyCoreOptions } from '@nestjs-shopify/core';
import { DatabaseSessionStorage } from '../session/database.session-storage';
import { ShopifyCoreConfig, shopifyCoreConfig } from '../config/core.config';
import { ShopifyAppBridgePlugin } from '../../plugin';

@Injectable()
export class ShopifyCoreConfigService {
  constructor(
    @Inject(shopifyCoreConfig.KEY)
    private readonly config: ShopifyCoreConfig,
    private readonly sessionStorage: DatabaseSessionStorage
  ) {}

  public create(): ShopifyCoreOptions {
    return {
      ...this.config,
      apiKey: ShopifyAppBridgePlugin.options.apiKey,
      apiSecretKey: ShopifyAppBridgePlugin.options.apiSecretKey,
      apiVersion: ShopifyAppBridgePlugin.options.apiVersion,
      hostName: ShopifyAppBridgePlugin.options.hostName,
      isEmbeddedApp: ShopifyAppBridgePlugin.options.isEmbeddedApp,
      scopes: ShopifyAppBridgePlugin.options.scopes,
      sessionStorage: this.sessionStorage,
    };
  }
}
