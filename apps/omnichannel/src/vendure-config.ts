import { HelpPlugin, quoteRequestedHandler } from '@bavaan/vendure-plugin-help';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import {
  CatalogPlugin,
  SearchProductVariantPlugin,
} from '@bavaan/vendure-plugin-catalog';
import {
  createProxyHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  dummyPaymentHandler,
  VendureConfig,
  Product,
  Order,
  Collection,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import path from 'path';
import { OrderPlugin } from '@bavaan/vendure-plugin-order';
import { LandingPagePlugin } from './plugins/landing-page/landing-page-plugin';
import { DemoModePlugin } from './plugins/demo-mode/demo-mode-plugin';
import { CustomFieldUiPlugin } from '@bavaan/vendure-plugin-ui-field-custom';

import {
  ConnectorPlugin,
  MagentoConnector,
  ShopifyConnector,
  WoocommerceConnector,
  BigcommerceConnector,
} from '@bavaan/vendure-plugin-connector';
import 'dotenv/config';
import { ApiVersion } from '@shopify/shopify-api';
import { compileUiExtensions, setBranding } from '@vendure/ui-devkit/compiler';
import { ShopifyAppBridgePlugin } from '@bavaan/vendure-plugin-shopify-app-bridge';

export const config: VendureConfig = {
  apiOptions: {
    port: 3000,
    adminApiPath: 'admin-api',
    shopApiPath: 'shop-api',
    adminApiPlayground: {
      settings: { 'request.credentials': 'include' },
    },
    adminApiDebug: true,
    shopApiPlayground: {
      settings: { 'request.credentials': 'include' },
    },
    shopApiDebug: true,
    middleware: [
      {
        handler: createProxyHandler({
          label: 'Demo Storefront',
          port: 4000,
          route: 'storefront',
        }),
        route: 'storefront',
      },
    ],
  },
  authOptions: {
    cookieOptions: {
      secret: '9s8wl7vkd8',
    },
    requireVerification: true,
    tokenMethod: ['cookie', 'bearer'],
  },
  dbConnectionOptions: {
    type: 'better-sqlite3',
    synchronize: false,
    logging: false,
    database: path.join(__dirname, '../vendure.sqlite'),
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {},
  plugins: [
    SearchProductVariantPlugin,
    HelpPlugin,
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
      assetUrlPrefix:
        'https://bavaan-omnichannel-platform.bavaan.cloud/assets/',
    }),
    EmailPlugin.init({
      route: 'mailbox',
      handlers: [...defaultEmailHandlers, quoteRequestedHandler],
      templatePath: path.join(__dirname, '../static/email/templates'),
      outputPath: path.join(__dirname, '../static/email/output'),
      globalTemplateVars: {
        fromAddress: '"Vendure Demo Store" <noreply@vendure.io>',
        verifyEmailAddressUrl:
          'https://bavaan-omnichannel-platform.bavaan.cloud/storefront/account/verify',
        passwordResetUrl:
          'https://bavaan-omnichannel-platform.bavaan.cloud/storefront/account/reset-password',
        changeEmailAddressUrl:
          'https://bavaan-omnichannel-platform.bavaan.cloud/storefront/account/change-email-address',
      },
      devMode: true,
    }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    AdminUiPlugin.init({
      route: 'admin',
      port: 3002,
      adminUiConfig: {
        apiHost: 'auto',
        apiPort: 'auto',
        hideVersion: true,
        hideVendureBranding: true,
        brand: 'Bavaan Shopify App Skeleton',
        loginImageUrl: '/admin/assets/mutil-channel.png',
      },
      app: compileUiExtensions({
        outputPath: path.join(__dirname, '__admin-ui'),
        extensions: [
          {
            globalStyles: path.join(
              __dirname,
              'themes/shopify/css/admin-theme.scss'
            ),
            staticAssets: [
              {
                path: path.join(__dirname, 'themes/images/magento.png'),
                rename: 'magento.png',
              },
              {
                path: path.join(__dirname, 'themes/images/question.svg'),
                rename: 'question.svg',
              },
              {
                path: path.join(__dirname, 'themes/images/shopify.png'),
                rename: 'shopify.png',
              },
              {
                path: path.join(__dirname, 'themes/images/woocommerce.png'),
                rename: 'woocommerce.png',
              },
              {
                path: path.join(__dirname, 'themes/images/bigcommerce.png'),
                rename: 'bigcommerce.png',
              },
              {
                path: path.join(__dirname, 'themes/images/mutil-channel.png'),
                rename: 'mutil-channel.png',
              },
            ],
          },
          setBranding({
            // The small logo appears in the top left of the screen
            smallLogoPath: path.join(
              __dirname,
              'themes/shopify/images/bavaan-logo-white-189x100.png'
            ),
            // The large logo is used on the login page
            largeLogoPath: path.join(
              __dirname,
              'themes/shopify/images/bavaan-logo-white-189x100.png'
            ),
            faviconPath: path.join(
              __dirname,
              'themes/shopify/images/bavaan-logo-white-189x100.png'
            ),
          }),
          CatalogPlugin.ui,
          OrderPlugin.ui,
          ConnectorPlugin.ui,
          HelpPlugin.ui,
          CustomFieldUiPlugin.ui,
        ],
      }),
    }),
    OrderPlugin.init({}),
    // LandingPagePlugin,
    // DemoModePlugin,
    ShopifyAppBridgePlugin.init({
      apiKey: process.env.SHOPIFY_API_KEY as string,
      apiSecretKey: process.env.SHOPIFY_API_SECRET as string,
      apiVersion: ApiVersion.October22,
      hostName: (process.env.SHOPIFY_HOST_NAME as string).replace(
        /https?:\/\//,
        ''
      ),
      isEmbeddedApp: false,
      scopes: (process.env.SHOPIFY_SCOPES as string).split(',') as string[],
      shop: process.env.SHOPIFY_SHOP as string,
    }),
    CatalogPlugin.init({}),
    ConnectorPlugin.init({
      httpMethod: 'POST',
      disabled: false,
      connectors: [
        new ShopifyConnector(),
        new MagentoConnector(),
        new WoocommerceConnector(),
        new BigcommerceConnector(),
      ],
      entities: [new Product(), new Order(), new Collection()],
      endpoint: process.env.DAGSTER_ENDPOINT_GRAPHQL as string,
    }),
  ],
};
