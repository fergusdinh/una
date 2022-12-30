import { quoteRequestedHandler } from '@bavaan/vendure-plugin-help/src/ui/quoteRequestedHandler';

import {
  MagentoConnector,
  ShopifyConnector,
  WoocommerceConnector,
  BigcommerceConnector,
} from '@bavaan/vendure-plugin-connector/src/api/connectors';
import { ConnectorPlugin } from '@bavaan/vendure-plugin-connector/src';
import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
  Product,
  Order,
  Collection,
} from '@vendure/core';
import { defaultEmailHandlers, EmailPlugin } from '@vendure/email-plugin';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import { AdminUiPlugin } from '@vendure/admin-ui-plugin';
import 'dotenv/config';
import path from 'path';
import { compileUiExtensions, setBranding } from '@vendure/ui-devkit/compiler';
import { SaasPlugin } from '@bavaan/vendure-plugin-saas/src';
import { CatalogPlugin } from '@bavaan/vendure-plugin-catalog/src';
import { HelpPlugin } from '@bavaan/vendure-plugin-help/src';
import { ShopifyAppBridgePlugin } from '@bavaan/vendure-plugin-shopify-app-bridge/src';
import { OrderPlugin } from '@bavaan/vendure-plugin-order/src';
import { ReportsPlugin } from '@bavaan/vendure-plugin-reports/src';
// import { SaasPlugin } from '@bavaan/vendure-plugin-saas';
import { ApiVersion } from '@shopify/shopify-api';
// import { CubeJsPlugin } from '@bavaan/vendure-plugin-cubejs';
// import { ReportsPlugin } from '@bavaan/vendure-plugin-reports';
// import { SubscriptionPlugin } from '@bavaan/vendure-plugin-subscription';
import { CustomFieldUiPlugin } from '@bavaan/vendure-plugin-ui-field-custom/src';

import {
  SearchProductVariantPlugin,
  SortPlugin,
} from '@bavaan/vendure-plugin-catalog/src/api/public.api';
const IS_DEV = process.env.APP_ENV === 'dev';

export const config: VendureConfig = {
  apiOptions: {
    port: 9000,
    adminApiPath: 'admin-api',
    hostname: 'localhost',
    shopApiPath: 'shop-api',
    cors: {
      origin: '*',
      allowedHeaders: 'Content-Type',
    },
    // The following options are useful in development mode,
    // but are best turned off for production for security
    // reasons.
    ...(IS_DEV
      ? {
          adminApiPlayground: {
            settings: { 'request.credentials': 'include' } as any,
          },
          adminApiDebug: true,
          shopApiPlayground: {
            settings: { 'request.credentials': 'include' } as any,
          },
          shopApiDebug: true,
        }
      : {}),
  },
  authOptions: {
    tokenMethod: ['bearer', 'cookie'],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME || 'superadmin',
      password: process.env.SUPERADMIN_PASSWORD || 'superadmin',
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET || 'cookie-secret',
    },
  },
  dbConnectionOptions: {
    type: 'better-sqlite3',
    // See the README.md "Migrations" section for an explanation of
    // the `synchronize` and `migrations` options.
    synchronize: false,
    migrations: [path.join(__dirname, './migrations/*.ts')],
    logging: false,
    database: path.join(__dirname, '../vendure.sqlite'),
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  // When adding or altering custom field definitions, the database will
  // need to be updated. See the "Migrations" section in README.md.
  customFields: {},
  plugins: [
    SearchProductVariantPlugin,
    HelpPlugin,
    AssetServerPlugin.init({
      route: 'assets',
      assetUploadDir: path.join(__dirname, '../static/assets'),
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    SortPlugin,
    EmailPlugin.init({
      // emailSender: new SendgridEmailSender(),
      devMode: true,
      outputPath: path.join(__dirname, '../static/email/test-emails'),
      route: 'mailbox',
      handlers: [...defaultEmailHandlers, quoteRequestedHandler],
      templatePath: path.join(__dirname, '../static/email/templates'),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation.
        // Here we are assuming a storefront running at http://localhost:8080.
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: 'http://localhost:9000/verify',
        passwordResetUrl: 'http://localhost:9000/password-reset',
        changeEmailAddressUrl:
          'http://localhost:9000/verify-email-address-change',
      },
    }),
    AdminUiPlugin.init({
      route: 'admin',
      hostname: '0.0.0.0',
      port: 3002,
      adminUiConfig: {
        hideVendureBranding: true,
        brand: 'Bavaan Shopify App Skeleton',
        hideVersion: true,
        tokenMethod: 'cookie',
      },
      app: compileUiExtensions({
        outputPath: path.join(__dirname, '__admin-ui'),
        additionalProcessArguments: ['--disable-host-check'],
        extensions: [
          {
            globalStyles: path.join(
              __dirname,
              'themes/shopify/css/admin-theme.scss'
            ),
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
          ConnectorPlugin.ui,
          CatalogPlugin.ui,
          OrderPlugin.ui,
          HelpPlugin.ui,
          CustomFieldUiPlugin.ui,
          // SaasPlugin.ui,
          // ReportsPlugin.ui,
        ],
        devMode: true,
      }),
    }),
    // SaasPlugin.init({
    //   disabled: false
    // }),
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
    // ShopifyAppBridgePlugin.init({
    //   apiKey: process.env.SHOPIFY_API_KEY as string,
    //   apiSecretKey: process.env.SHOPIFY_API_SECRET as string,
    //   apiVersion: ApiVersion.October22,
    //   hostName: (process.env.SHOPIFY_HOST_NAME as string).replace(
    //     /https?:\/\//,
    //     ''
    //   ),
    //   isEmbeddedApp: false,
    //   scopes: (process.env.SHOPIFY_SCOPES as string).split(',') as any[],
    //   shop: process.env.SHOPIFY_SHOP as string,
    // }),
    OrderPlugin.init({}),
    CatalogPlugin.init({}),
    // CubeJsPlugin.init({
    //   port: 4000,
    //   route: 'cube',
    // }),
    // SubscriptionPlugin.init({
    //   baseUrl: process.env.LAGO_ENDPOINT as string,
    //   apiKey: process.env.LAGO_API_KEY as string,
    //   apiPath: process.env.LAGO_API_PATH as string,
    //   email: process.env.LAGO_EMAIL as string,
    //   password: process.env.LAGO_PASSWORD as string,
    //   disabled: false,
    // }),
  ],
};
