import { MigrationInterface, QueryRunner } from 'typeorm';

export class new1672366774469 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "country_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "country" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "enabled" boolean NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "zone" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "channel" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "token" varchar NOT NULL, "defaultLanguageCode" varchar NOT NULL, "currencyCode" varchar NOT NULL, "pricesIncludeTax" boolean NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "defaultTaxZoneId" integer, "defaultShippingZoneId" integer, CONSTRAINT "UQ_06127ac6c6d913f4320759971db" UNIQUE ("code"), CONSTRAINT "UQ_842699fce4f3470a7d06d89de88" UNIQUE ("token"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "tag" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "value" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "type" varchar NOT NULL, "mimeType" varchar NOT NULL, "width" integer NOT NULL DEFAULT (0), "height" integer NOT NULL DEFAULT (0), "fileSize" integer NOT NULL, "source" varchar NOT NULL, "preview" varchar NOT NULL, "focalPoint" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "collectionId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "slug" varchar NOT NULL, "description" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isRoot" boolean NOT NULL DEFAULT (0), "position" integer NOT NULL, "isPrivate" boolean NOT NULL DEFAULT (0), "filters" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "parentId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isPrivate" boolean NOT NULL DEFAULT (0), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, CONSTRAINT "UQ_0c9a5d053fdf4ebb5f0490b40fd" UNIQUE ("code"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_value_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "productId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "slug" varchar NOT NULL, "description" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "customFieldsMetadata" text)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_group_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_group" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "stock_movement" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar NOT NULL, "quantity" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discriminator" varchar NOT NULL, "productVariantId" integer, "orderItemId" integer, "orderLineId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_94e15d5f12d355d117390131ac" ON "stock_movement" ("discriminator") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "tax_category" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "isDefault" boolean NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "productVariantId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_price" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "price" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "channelId" integer NOT NULL, "variantId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "sku" varchar NOT NULL, "stockOnHand" integer NOT NULL DEFAULT (0), "stockAllocated" integer NOT NULL DEFAULT (0), "outOfStockThreshold" integer NOT NULL DEFAULT (0), "useGlobalOutOfStockThreshold" boolean NOT NULL DEFAULT (1), "trackInventory" varchar NOT NULL DEFAULT ('INHERIT'), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer, "featuredAssetId" integer, "taxCategoryId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "fullName" varchar NOT NULL DEFAULT (''), "company" varchar NOT NULL DEFAULT (''), "streetLine1" varchar NOT NULL, "streetLine2" varchar NOT NULL DEFAULT (''), "city" varchar NOT NULL DEFAULT (''), "province" varchar NOT NULL DEFAULT (''), "postalCode" varchar NOT NULL DEFAULT (''), "phoneNumber" varchar NOT NULL DEFAULT (''), "defaultShippingAddress" boolean NOT NULL DEFAULT (0), "defaultBillingAddress" boolean NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "countryId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer_group" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "authentication_method" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "identifier" varchar, "passwordHash" varchar, "verificationToken" varchar, "passwordResetToken" varchar, "identifierChangeToken" varchar, "pendingIdentifier" varchar, "strategy" varchar, "externalIdentifier" varchar, "metadata" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "userId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a23445b2c942d8dfcae15b8de2" ON "authentication_method" ("type") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "role" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "description" varchar NOT NULL, "permissions" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "identifier" varchar NOT NULL, "verified" boolean NOT NULL DEFAULT (0), "lastLogin" datetime, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "title" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phoneNumber" varchar, "emailAddress" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "customFieldsCountry_select" varchar(255) NOT NULL DEFAULT (''), CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "fulfillment" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "state" varchar NOT NULL, "trackingCode" varchar NOT NULL DEFAULT (''), "method" varchar NOT NULL, "handlerCode" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "method" varchar NOT NULL, "amount" integer NOT NULL, "state" varchar NOT NULL, "errorMessage" varchar, "transactionId" varchar, "metadata" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "refund" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "items" integer NOT NULL, "shipping" integer NOT NULL, "adjustment" integer NOT NULL, "total" integer NOT NULL, "method" varchar NOT NULL, "reason" varchar, "state" varchar NOT NULL, "transactionId" varchar, "metadata" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "paymentId" integer NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_item" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "initialListPrice" integer, "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "adjustments" text NOT NULL, "taxLines" text NOT NULL, "cancelled" boolean NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lineId" integer NOT NULL, "refundId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_line" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productVariantId" integer, "taxCategoryId" integer, "featuredAssetId" integer, "orderId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "surcharge" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "description" varchar NOT NULL, "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "sku" varchar NOT NULL, "taxLines" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer, "orderModificationId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "priceChange" integer NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "promotion" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "startsAt" datetime, "endsAt" datetime, "couponCode" varchar, "perCustomerUsageLimit" integer, "name" varchar NOT NULL, "enabled" boolean NOT NULL, "conditions" text NOT NULL, "actions" text NOT NULL, "priorityScore" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_method_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL DEFAULT (''), "description" varchar NOT NULL DEFAULT (''), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_method" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "checker" text NOT NULL, "calculator" text NOT NULL, "fulfillmentHandlerCode" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_line" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "adjustments" text NOT NULL, "taxLines" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "shippingMethodId" integer NOT NULL, "orderId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "state" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "orderPlacedAt" datetime, "couponCodes" text NOT NULL, "shippingAddress" text NOT NULL, "billingAddress" text NOT NULL, "currencyCode" varchar NOT NULL, "subTotal" integer NOT NULL, "subTotalWithTax" integer NOT NULL, "shipping" integer NOT NULL DEFAULT (0), "shippingWithTax" integer NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "taxZoneId" integer, "customerId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "tax_rate" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "enabled" boolean NOT NULL, "value" decimal(5,2) NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "categoryId" integer, "zoneId" integer, "customerGroupId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "administrator" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "emailAddress" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "UQ_154f5c538b1576ccc277b1ed631" UNIQUE ("emailAddress"), CONSTRAINT "REL_1966e18ce6a39a82b19204704d" UNIQUE ("userId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "payment_method" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL DEFAULT (''), "code" varchar NOT NULL DEFAULT (''), "description" varchar NOT NULL DEFAULT (''), "enabled" boolean NOT NULL, "checker" text, "handler" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "token" varchar NOT NULL, "expires" datetime NOT NULL, "invalidated" boolean NOT NULL, "authenticationStrategy" varchar, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "activeOrderId" integer, "activeChannelId" integer, "type" varchar NOT NULL, "userId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_232f8e85d7633bd6ddfad42169" ON "session" ("token") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e5598363000cab9d9116bd5835" ON "session" ("type") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "global_settings" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "availableLanguages" text NOT NULL, "trackInventory" boolean NOT NULL DEFAULT (1), "outOfStockThreshold" integer NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "history_entry" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar NOT NULL, "isPublic" boolean NOT NULL, "data" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discriminator" varchar NOT NULL, "administratorId" integer, "customerId" integer, "orderId" integer)`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f3a761f6bcfabb474b11e1e51f" ON "history_entry" ("discriminator") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "search_index_item" ("languageCode" varchar NOT NULL, "enabled" boolean NOT NULL, "productName" varchar NOT NULL, "productVariantName" varchar NOT NULL, "description" text NOT NULL, "slug" varchar NOT NULL, "sku" varchar NOT NULL, "price" integer NOT NULL, "priceWithTax" integer NOT NULL, "facetIds" text NOT NULL, "facetValueIds" text NOT NULL, "collectionIds" text NOT NULL, "collectionSlugs" text NOT NULL, "channelIds" text NOT NULL, "productPreview" varchar NOT NULL, "productPreviewFocalPoint" text, "productVariantPreview" varchar NOT NULL, "productVariantPreviewFocalPoint" text, "inStock" boolean NOT NULL DEFAULT (1), "productInStock" boolean NOT NULL DEFAULT (1), "productVariantId" integer NOT NULL, "channelId" integer NOT NULL, "productId" integer NOT NULL, "productAssetId" integer, "productVariantAssetId" integer, PRIMARY KEY ("languageCode", "productVariantId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6fb55742e13e8082954d0436dc" ON "search_index_item" ("productName") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d8791f444a8bf23fe4c1bc020c" ON "search_index_item" ("productVariantName") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9a5a6a556f75c4ac7bfdd03410" ON "search_index_item" ("description") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "job_record_buffer" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "bufferId" varchar NOT NULL, "job" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "job_record" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "queueName" varchar NOT NULL, "data" text, "state" varchar NOT NULL, "progress" integer NOT NULL, "result" text, "error" varchar, "startedAt" datetime(6), "settledAt" datetime(6), "isSettled" boolean NOT NULL, "retries" integer NOT NULL, "attempts" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "connector_channel_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "channelId" varchar NOT NULL, "settings" text NOT NULL, "type" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "totalAvailable" integer NOT NULL, "totalVariant" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "sort_price_between" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "priceBetween" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "feature_request_entity" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "content" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "zone_members_country" ("zoneId" integer NOT NULL, "countryId" integer NOT NULL, PRIMARY KEY ("zoneId", "countryId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7350d77b6474313fbbaf4b094c" ON "zone_members_country" ("zoneId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7baeecaf955e54bec73f998b0d" ON "zone_members_country" ("countryId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "asset_tags_tag" ("assetId" integer NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("assetId", "tagId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9e412b00d4c6cee1a4b3d92071" ON "asset_tags_tag" ("assetId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb5e800171ffbe9823f2cc727f" ON "asset_tags_tag" ("tagId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "asset_channels_channel" ("assetId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("assetId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc4e7435f9f5e9e6436bebd33b" ON "asset_channels_channel" ("assetId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_16ca9151a5153f1169da5b7b7e" ON "asset_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection_product_variants_product_variant" ("collectionId" integer NOT NULL, "productVariantId" integer NOT NULL, PRIMARY KEY ("collectionId", "productVariantId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6faa7b72422d9c4679e2f186ad" ON "collection_product_variants_product_variant" ("collectionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb05887e2867365f236d7dd95e" ON "collection_product_variants_product_variant" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection_channels_channel" ("collectionId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("collectionId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cdbf33ffb5d451916125152008" ON "collection_channels_channel" ("collectionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7216ab24077cf5cbece7857dbb" ON "collection_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_channels_channel" ("facetId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("facetId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca796020c6d097e251e5d6d2b0" ON "facet_channels_channel" ("facetId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a8ea404d05bf682516184db7d" ON "facet_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_value_channels_channel" ("facetValueId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("facetValueId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad690c1b05596d7f52e52ffeed" ON "facet_value_channels_channel" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1d54c0b9db3e2eb17faaf5919" ON "facet_value_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_facet_values_facet_value" ("productId" integer NOT NULL, "facetValueId" integer NOT NULL, PRIMARY KEY ("productId", "facetValueId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6a0558e650d75ae639ff38e413" ON "product_facet_values_facet_value" ("productId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06e7d73673ee630e8ec50d0b29" ON "product_facet_values_facet_value" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_channels_channel" ("productId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("productId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26d12be3b5fec6c4adb1d79284" ON "product_channels_channel" ("productId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a51dfbd87c330c075c39832b6e" ON "product_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_options_product_option" ("productVariantId" integer NOT NULL, "productOptionId" integer NOT NULL, PRIMARY KEY ("productVariantId", "productOptionId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_526f0131260eec308a3bd2b61b" ON "product_variant_options_product_option" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e96a71affe63c97f7fa2f076da" ON "product_variant_options_product_option" ("productOptionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_facet_values_facet_value" ("productVariantId" integer NOT NULL, "facetValueId" integer NOT NULL, PRIMARY KEY ("productVariantId", "facetValueId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69567bc225b6bbbd732d6c5455" ON "product_variant_facet_values_facet_value" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d641b761ed1dce4ef3cd33d55" ON "product_variant_facet_values_facet_value" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_channels_channel" ("productVariantId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("productVariantId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_beeb2b3cd800e589f2213ae99d" ON "product_variant_channels_channel" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d194bff171b62357688a5d0f55" ON "product_variant_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "role_channels_channel" ("roleId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("roleId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfd2a03e9988eda6a9d1176011" ON "role_channels_channel" ("roleId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e09dfee62b158307404202b43a" ON "role_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY ("userId", "roleId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer_groups_customer_group" ("customerId" integer NOT NULL, "customerGroupId" integer NOT NULL, PRIMARY KEY ("customerId", "customerGroupId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b823a3c8bf3b78d3ed68736485" ON "customer_groups_customer_group" ("customerId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_85feea3f0e5e82133605f78db0" ON "customer_groups_customer_group" ("customerGroupId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer_channels_channel" ("customerId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("customerId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a842c9fe8cd4c8ff31402d172d" ON "customer_channels_channel" ("customerId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc9f69207a8867f83b0fd257e3" ON "customer_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_item_fulfillments_fulfillment" ("orderItemId" integer NOT NULL, "fulfillmentId" integer NOT NULL, PRIMARY KEY ("orderItemId", "fulfillmentId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a568a3d5aa7f237edab624960b" ON "order_item_fulfillments_fulfillment" ("orderItemId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8132041a647c28eb27ecc1691f" ON "order_item_fulfillments_fulfillment" ("fulfillmentId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_modification_order_items_order_item" ("orderModificationId" integer NOT NULL, "orderItemId" integer NOT NULL, PRIMARY KEY ("orderModificationId", "orderItemId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a48502a38aded69d087a8ec08a" ON "order_modification_order_items_order_item" ("orderModificationId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9d631d7bd3d44af50eca535d72" ON "order_modification_order_items_order_item" ("orderItemId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "promotion_channels_channel" ("promotionId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("promotionId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6d9e2c39ab12391aaa374bcdaa" ON "promotion_channels_channel" ("promotionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0eaaf0f4b6c69afde1e88ffb52" ON "promotion_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_method_channels_channel" ("shippingMethodId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("shippingMethodId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0a17b94aa5a162f0d422920eb" ON "shipping_method_channels_channel" ("shippingMethodId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2b98dfb56685147bed509acc3" ON "shipping_method_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_promotions_promotion" ("orderId" integer NOT NULL, "promotionId" integer NOT NULL, PRIMARY KEY ("orderId", "promotionId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_67be0e40122ab30a62a9817efe" ON "order_promotions_promotion" ("orderId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2c26b988769c0e3b0120bdef31" ON "order_promotions_promotion" ("promotionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_channels_channel" ("orderId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("orderId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d8e5c204480204a60e151e485" ON "order_channels_channel" ("orderId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0d16db872499e83b15999f8c7" ON "order_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "payment_method_channels_channel" ("paymentMethodId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("paymentMethodId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5bcb569635ce5407eb3f264487" ON "payment_method_channels_channel" ("paymentMethodId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c00e36f667d35031087b382e61" ON "payment_method_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_country_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_20958e5bdb4c996c18ca63d18e4" FOREIGN KEY ("baseId") REFERENCES "country" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_country_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "country_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "country_translation"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_country_translation" RENAME TO "country_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_channel" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "token" varchar NOT NULL, "defaultLanguageCode" varchar NOT NULL, "currencyCode" varchar NOT NULL, "pricesIncludeTax" boolean NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "defaultTaxZoneId" integer, "defaultShippingZoneId" integer, CONSTRAINT "UQ_06127ac6c6d913f4320759971db" UNIQUE ("code"), CONSTRAINT "UQ_842699fce4f3470a7d06d89de88" UNIQUE ("token"), CONSTRAINT "FK_afe9f917a1c82b9e9e69f7c6129" FOREIGN KEY ("defaultTaxZoneId") REFERENCES "zone" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c9ca2f58d4517460435cbd8b4c9" FOREIGN KEY ("defaultShippingZoneId") REFERENCES "zone" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_channel"("createdAt", "updatedAt", "code", "token", "defaultLanguageCode", "currencyCode", "pricesIncludeTax", "id", "defaultTaxZoneId", "defaultShippingZoneId") SELECT "createdAt", "updatedAt", "code", "token", "defaultLanguageCode", "currencyCode", "pricesIncludeTax", "id", "defaultTaxZoneId", "defaultShippingZoneId" FROM "channel"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "channel"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_channel" RENAME TO "channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_collection_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "collectionId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, CONSTRAINT "FK_51da53b26522dc0525762d2de8e" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_1ed9e48dfbf74b5fcbb35d3d686" FOREIGN KEY ("collectionId") REFERENCES "collection" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_collection_asset"("createdAt", "updatedAt", "assetId", "position", "collectionId", "id") SELECT "createdAt", "updatedAt", "assetId", "position", "collectionId", "id" FROM "collection_asset"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "collection_asset"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_collection_asset" RENAME TO "collection_asset"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_collection_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "slug" varchar NOT NULL, "description" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_e329f9036210d75caa1d8f2154a" FOREIGN KEY ("baseId") REFERENCES "collection" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_collection_translation"("createdAt", "updatedAt", "languageCode", "name", "slug", "description", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "slug", "description", "id", "baseId" FROM "collection_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "collection_translation"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_collection_translation" RENAME TO "collection_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_collection" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isRoot" boolean NOT NULL DEFAULT (0), "position" integer NOT NULL, "isPrivate" boolean NOT NULL DEFAULT (0), "filters" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "parentId" integer, CONSTRAINT "FK_7256fef1bb42f1b38156b7449f5" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_4257b61275144db89fa0f5dc059" FOREIGN KEY ("parentId") REFERENCES "collection" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_collection"("createdAt", "updatedAt", "isRoot", "position", "isPrivate", "filters", "id", "featuredAssetId", "parentId") SELECT "createdAt", "updatedAt", "isRoot", "position", "isPrivate", "filters", "id", "featuredAssetId", "parentId" FROM "collection"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "collection"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_collection" RENAME TO "collection"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_facet_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_eaea53f44bf9e97790d38a3d68f" FOREIGN KEY ("baseId") REFERENCES "facet" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_facet_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "facet_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "facet_translation"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_facet_translation" RENAME TO "facet_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_facet_value_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_3d6e45823b65de808a66cb1423b" FOREIGN KEY ("baseId") REFERENCES "facet_value" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_facet_value_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "facet_value_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "facet_value_translation"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_facet_value_translation" RENAME TO "facet_value_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer, CONSTRAINT "FK_d101dc2265a7341be3d94968c5b" FOREIGN KEY ("facetId") REFERENCES "facet" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "facet_value"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "facet_value"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_facet_value" RENAME TO "facet_value"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "productId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, CONSTRAINT "FK_5888ac17b317b93378494a10620" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_0d1294f5c22a56da7845ebab72c" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_asset"("createdAt", "updatedAt", "assetId", "position", "productId", "id") SELECT "createdAt", "updatedAt", "assetId", "position", "productId", "id" FROM "product_asset"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_asset"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_asset" RENAME TO "product_asset"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "slug" varchar NOT NULL, "description" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_7dbc75cb4e8b002620c4dbfdac5" FOREIGN KEY ("baseId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_translation"("createdAt", "updatedAt", "languageCode", "name", "slug", "description", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "slug", "description", "id", "baseId" FROM "product_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_translation"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_translation" RENAME TO "product_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "customFieldsMetadata" text, CONSTRAINT "FK_91a19e6613534949a4ce6e76ff8" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product"("createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId", "customFieldsMetadata") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId", "customFieldsMetadata" FROM "product"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product" RENAME TO "product"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_option_group_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_93751abc1451972c02e033b766c" FOREIGN KEY ("baseId") REFERENCES "product_option_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_option_group_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "product_option_group_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_option_group_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_product_option_group_translation" RENAME TO "product_option_group_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_option_group" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer, CONSTRAINT "FK_a6e91739227bf4d442f23c52c75" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_option_group"("createdAt", "updatedAt", "deletedAt", "code", "id", "productId") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "productId" FROM "product_option_group"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_option_group"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_option_group" RENAME TO "product_option_group"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_option_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_a79a443c1f7841f3851767faa6d" FOREIGN KEY ("baseId") REFERENCES "product_option" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_option_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "product_option_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_option_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_product_option_translation" RENAME TO "product_option_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "FK_a6debf9198e2fbfa006aa10d710" FOREIGN KEY ("groupId") REFERENCES "product_option_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_option"("createdAt", "updatedAt", "deletedAt", "code", "id", "groupId") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "groupId" FROM "product_option"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_option"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_option" RENAME TO "product_option"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_94e15d5f12d355d117390131ac"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_stock_movement" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar NOT NULL, "quantity" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discriminator" varchar NOT NULL, "productVariantId" integer, "orderItemId" integer, "orderLineId" integer, CONSTRAINT "FK_e65ba3882557cab4febb54809bb" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cbb0990e398bf7713aebdd38482" FOREIGN KEY ("orderItemId") REFERENCES "order_item" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d2c8d5fca981cc820131f81aa83" FOREIGN KEY ("orderLineId") REFERENCES "order_line" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_stock_movement"("createdAt", "updatedAt", "type", "quantity", "id", "discriminator", "productVariantId", "orderItemId", "orderLineId") SELECT "createdAt", "updatedAt", "type", "quantity", "id", "discriminator", "productVariantId", "orderItemId", "orderLineId" FROM "stock_movement"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "stock_movement"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_stock_movement" RENAME TO "stock_movement"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_94e15d5f12d355d117390131ac" ON "stock_movement" ("discriminator") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_variant_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "productVariantId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, CONSTRAINT "FK_10b5a2e3dee0e30b1e26c32f5c7" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_fa21412afac15a2304f3eb35feb" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_variant_asset"("createdAt", "updatedAt", "assetId", "position", "productVariantId", "id") SELECT "createdAt", "updatedAt", "assetId", "position", "productVariantId", "id" FROM "product_variant_asset"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_variant_asset"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_variant_asset" RENAME TO "product_variant_asset"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_variant_price" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "price" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "channelId" integer NOT NULL, "variantId" integer, CONSTRAINT "FK_e6126cd268aea6e9b31d89af9ab" FOREIGN KEY ("variantId") REFERENCES "product_variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_variant_price"("createdAt", "updatedAt", "price", "id", "channelId", "variantId") SELECT "createdAt", "updatedAt", "price", "id", "channelId", "variantId" FROM "product_variant_price"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_variant_price"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_variant_price" RENAME TO "product_variant_price"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_variant_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_420f4d6fb75d38b9dca79bc43b4" FOREIGN KEY ("baseId") REFERENCES "product_variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_variant_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "product_variant_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_product_variant_translation" RENAME TO "product_variant_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_variant" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "sku" varchar NOT NULL, "stockOnHand" integer NOT NULL DEFAULT (0), "stockAllocated" integer NOT NULL DEFAULT (0), "outOfStockThreshold" integer NOT NULL DEFAULT (0), "useGlobalOutOfStockThreshold" boolean NOT NULL DEFAULT (1), "trackInventory" varchar NOT NULL DEFAULT ('INHERIT'), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer, "featuredAssetId" integer, "taxCategoryId" integer, CONSTRAINT "FK_0e6f516053cf982b537836e21cf" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE SET NULL ON UPDATE NO ACTION, CONSTRAINT "FK_e38dca0d82fd64c7cf8aac8b8ef" FOREIGN KEY ("taxCategoryId") REFERENCES "tax_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_6e420052844edf3a5506d863ce6" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_variant"("createdAt", "updatedAt", "deletedAt", "enabled", "sku", "stockOnHand", "stockAllocated", "outOfStockThreshold", "useGlobalOutOfStockThreshold", "trackInventory", "id", "productId", "featuredAssetId", "taxCategoryId") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "sku", "stockOnHand", "stockAllocated", "outOfStockThreshold", "useGlobalOutOfStockThreshold", "trackInventory", "id", "productId", "featuredAssetId", "taxCategoryId" FROM "product_variant"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_variant"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_variant" RENAME TO "product_variant"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_address" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "fullName" varchar NOT NULL DEFAULT (''), "company" varchar NOT NULL DEFAULT (''), "streetLine1" varchar NOT NULL, "streetLine2" varchar NOT NULL DEFAULT (''), "city" varchar NOT NULL DEFAULT (''), "province" varchar NOT NULL DEFAULT (''), "postalCode" varchar NOT NULL DEFAULT (''), "phoneNumber" varchar NOT NULL DEFAULT (''), "defaultShippingAddress" boolean NOT NULL DEFAULT (0), "defaultBillingAddress" boolean NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "countryId" integer, CONSTRAINT "FK_dc34d382b493ade1f70e834c4d3" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_d87215343c3a3a67e6a0b7f3ea9" FOREIGN KEY ("countryId") REFERENCES "country" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_address"("createdAt", "updatedAt", "fullName", "company", "streetLine1", "streetLine2", "city", "province", "postalCode", "phoneNumber", "defaultShippingAddress", "defaultBillingAddress", "id", "customerId", "countryId") SELECT "createdAt", "updatedAt", "fullName", "company", "streetLine1", "streetLine2", "city", "province", "postalCode", "phoneNumber", "defaultShippingAddress", "defaultBillingAddress", "id", "customerId", "countryId" FROM "address"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "address"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_address" RENAME TO "address"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a23445b2c942d8dfcae15b8de2"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_authentication_method" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "identifier" varchar, "passwordHash" varchar, "verificationToken" varchar, "passwordResetToken" varchar, "identifierChangeToken" varchar, "pendingIdentifier" varchar, "strategy" varchar, "externalIdentifier" varchar, "metadata" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_00cbe87bc0d4e36758d61bd31d6" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_authentication_method"("createdAt", "updatedAt", "identifier", "passwordHash", "verificationToken", "passwordResetToken", "identifierChangeToken", "pendingIdentifier", "strategy", "externalIdentifier", "metadata", "id", "type", "userId") SELECT "createdAt", "updatedAt", "identifier", "passwordHash", "verificationToken", "passwordResetToken", "identifierChangeToken", "pendingIdentifier", "strategy", "externalIdentifier", "metadata", "id", "type", "userId" FROM "authentication_method"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "authentication_method"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_authentication_method" RENAME TO "authentication_method"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a23445b2c942d8dfcae15b8de2" ON "authentication_method" ("type") `,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_customer" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "title" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phoneNumber" varchar, "emailAddress" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "customFieldsCountry_select" varchar(255) NOT NULL DEFAULT (''), CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"), CONSTRAINT "FK_3f62b42ed23958b120c235f74df" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_customer"("createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "id", "userId", "customFieldsCountry_select") SELECT "createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "id", "userId", "customFieldsCountry_select" FROM "customer"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "customer"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_customer" RENAME TO "customer"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_payment" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "method" varchar NOT NULL, "amount" integer NOT NULL, "state" varchar NOT NULL, "errorMessage" varchar, "transactionId" varchar, "metadata" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer, CONSTRAINT "FK_d09d285fe1645cd2f0db811e293" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_payment"("createdAt", "updatedAt", "method", "amount", "state", "errorMessage", "transactionId", "metadata", "id", "orderId") SELECT "createdAt", "updatedAt", "method", "amount", "state", "errorMessage", "transactionId", "metadata", "id", "orderId" FROM "payment"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "payment"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_payment" RENAME TO "payment"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_refund" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "items" integer NOT NULL, "shipping" integer NOT NULL, "adjustment" integer NOT NULL, "total" integer NOT NULL, "method" varchar NOT NULL, "reason" varchar, "state" varchar NOT NULL, "transactionId" varchar, "metadata" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "paymentId" integer NOT NULL, CONSTRAINT "FK_1c6932a756108788a361e7d4404" FOREIGN KEY ("paymentId") REFERENCES "payment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_refund"("createdAt", "updatedAt", "items", "shipping", "adjustment", "total", "method", "reason", "state", "transactionId", "metadata", "id", "paymentId") SELECT "createdAt", "updatedAt", "items", "shipping", "adjustment", "total", "method", "reason", "state", "transactionId", "metadata", "id", "paymentId" FROM "refund"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "refund"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_refund" RENAME TO "refund"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_item" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "initialListPrice" integer, "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "adjustments" text NOT NULL, "taxLines" text NOT NULL, "cancelled" boolean NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lineId" integer NOT NULL, "refundId" integer, CONSTRAINT "FK_69384323444206753f0cdeb64e0" FOREIGN KEY ("lineId") REFERENCES "order_line" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_3e5161133689fba526377cbccd3" FOREIGN KEY ("refundId") REFERENCES "refund" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_item"("createdAt", "updatedAt", "initialListPrice", "listPrice", "listPriceIncludesTax", "adjustments", "taxLines", "cancelled", "id", "lineId", "refundId") SELECT "createdAt", "updatedAt", "initialListPrice", "listPrice", "listPriceIncludesTax", "adjustments", "taxLines", "cancelled", "id", "lineId", "refundId" FROM "order_item"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "order_item"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order_item" RENAME TO "order_item"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_line" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productVariantId" integer, "taxCategoryId" integer, "featuredAssetId" integer, "orderId" integer, CONSTRAINT "FK_cbcd22193eda94668e84d33f185" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_77be94ce9ec6504466179462275" FOREIGN KEY ("taxCategoryId") REFERENCES "tax_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9f065453910ea77d4be8e92618f" FOREIGN KEY ("featuredAssetId") REFERENCES "asset" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_239cfca2a55b98b90b6bef2e44f" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_line"("createdAt", "updatedAt", "id", "productVariantId", "taxCategoryId", "featuredAssetId", "orderId") SELECT "createdAt", "updatedAt", "id", "productVariantId", "taxCategoryId", "featuredAssetId", "orderId" FROM "order_line"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "order_line"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order_line" RENAME TO "order_line"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_surcharge" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "description" varchar NOT NULL, "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "sku" varchar NOT NULL, "taxLines" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer, "orderModificationId" integer, CONSTRAINT "FK_154eb685f9b629033bd266df7fa" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_a49c5271c39cc8174a0535c8088" FOREIGN KEY ("orderModificationId") REFERENCES "order_modification" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_surcharge"("createdAt", "updatedAt", "description", "listPrice", "listPriceIncludesTax", "sku", "taxLines", "id", "orderId", "orderModificationId") SELECT "createdAt", "updatedAt", "description", "listPrice", "listPriceIncludesTax", "sku", "taxLines", "id", "orderId", "orderModificationId" FROM "surcharge"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "surcharge"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_surcharge" RENAME TO "surcharge"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "priceChange" integer NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"), CONSTRAINT "FK_1df5bc14a47ef24d2e681f45598" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_ad2991fa2933ed8b7f86a716338" FOREIGN KEY ("paymentId") REFERENCES "payment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_cb66b63b6e97613013795eadbd5" FOREIGN KEY ("refundId") REFERENCES "refund" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_modification"("createdAt", "updatedAt", "note", "priceChange", "shippingAddressChange", "billingAddressChange", "id", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "priceChange", "shippingAddressChange", "billingAddressChange", "id", "orderId", "paymentId", "refundId" FROM "order_modification"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "order_modification"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order_modification" RENAME TO "order_modification"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_shipping_method_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL DEFAULT (''), "description" varchar NOT NULL DEFAULT (''), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer, CONSTRAINT "FK_85ec26c71067ebc84adcd98d1a5" FOREIGN KEY ("baseId") REFERENCES "shipping_method" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_shipping_method_translation"("createdAt", "updatedAt", "languageCode", "name", "description", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "description", "id", "baseId" FROM "shipping_method_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "shipping_method_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_shipping_method_translation" RENAME TO "shipping_method_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_shipping_line" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "adjustments" text NOT NULL, "taxLines" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "shippingMethodId" integer NOT NULL, "orderId" integer, CONSTRAINT "FK_e2e7642e1e88167c1dfc827fdf3" FOREIGN KEY ("shippingMethodId") REFERENCES "shipping_method" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_c9f34a440d490d1b66f6829b86c" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_shipping_line"("createdAt", "updatedAt", "listPrice", "listPriceIncludesTax", "adjustments", "taxLines", "id", "shippingMethodId", "orderId") SELECT "createdAt", "updatedAt", "listPrice", "listPriceIncludesTax", "adjustments", "taxLines", "id", "shippingMethodId", "orderId" FROM "shipping_line"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "shipping_line"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_shipping_line" RENAME TO "shipping_line"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "state" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "orderPlacedAt" datetime, "couponCodes" text NOT NULL, "shippingAddress" text NOT NULL, "billingAddress" text NOT NULL, "currencyCode" varchar NOT NULL, "subTotal" integer NOT NULL, "subTotalWithTax" integer NOT NULL, "shipping" integer NOT NULL DEFAULT (0), "shippingWithTax" integer NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "taxZoneId" integer, "customerId" integer, CONSTRAINT "FK_124456e637cca7a415897dce659" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order"("createdAt", "updatedAt", "code", "state", "active", "orderPlacedAt", "couponCodes", "shippingAddress", "billingAddress", "currencyCode", "subTotal", "subTotalWithTax", "shipping", "shippingWithTax", "id", "taxZoneId", "customerId") SELECT "createdAt", "updatedAt", "code", "state", "active", "orderPlacedAt", "couponCodes", "shippingAddress", "billingAddress", "currencyCode", "subTotal", "subTotalWithTax", "shipping", "shippingWithTax", "id", "taxZoneId", "customerId" FROM "order"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order" RENAME TO "order"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_tax_rate" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "enabled" boolean NOT NULL, "value" decimal(5,2) NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "categoryId" integer, "zoneId" integer, "customerGroupId" integer, CONSTRAINT "FK_7ee3306d7638aa85ca90d672198" FOREIGN KEY ("categoryId") REFERENCES "tax_category" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_9872fc7de2f4e532fd3230d1915" FOREIGN KEY ("zoneId") REFERENCES "zone" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_8b5ab52fc8887c1a769b9276caf" FOREIGN KEY ("customerGroupId") REFERENCES "customer_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_tax_rate"("createdAt", "updatedAt", "name", "enabled", "value", "id", "categoryId", "zoneId", "customerGroupId") SELECT "createdAt", "updatedAt", "name", "enabled", "value", "id", "categoryId", "zoneId", "customerGroupId" FROM "tax_rate"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "tax_rate"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_tax_rate" RENAME TO "tax_rate"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_administrator" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "emailAddress" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "UQ_154f5c538b1576ccc277b1ed631" UNIQUE ("emailAddress"), CONSTRAINT "REL_1966e18ce6a39a82b19204704d" UNIQUE ("userId"), CONSTRAINT "FK_1966e18ce6a39a82b19204704d7" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_administrator"("createdAt", "updatedAt", "deletedAt", "firstName", "lastName", "emailAddress", "id", "userId") SELECT "createdAt", "updatedAt", "deletedAt", "firstName", "lastName", "emailAddress", "id", "userId" FROM "administrator"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "administrator"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_administrator" RENAME TO "administrator"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_232f8e85d7633bd6ddfad42169"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e5598363000cab9d9116bd5835"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_session" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "token" varchar NOT NULL, "expires" datetime NOT NULL, "invalidated" boolean NOT NULL, "authenticationStrategy" varchar, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "activeOrderId" integer, "activeChannelId" integer, "type" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_7a75399a4f4ffa48ee02e98c059" FOREIGN KEY ("activeOrderId") REFERENCES "order" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_eb87ef1e234444728138302263b" FOREIGN KEY ("activeChannelId") REFERENCES "channel" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_session"("createdAt", "updatedAt", "token", "expires", "invalidated", "authenticationStrategy", "id", "activeOrderId", "activeChannelId", "type", "userId") SELECT "createdAt", "updatedAt", "token", "expires", "invalidated", "authenticationStrategy", "id", "activeOrderId", "activeChannelId", "type", "userId" FROM "session"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "session"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_session" RENAME TO "session"`,
      undefined
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_232f8e85d7633bd6ddfad42169" ON "session" ("token") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e5598363000cab9d9116bd5835" ON "session" ("type") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_f3a761f6bcfabb474b11e1e51f"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_history_entry" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar NOT NULL, "isPublic" boolean NOT NULL, "data" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discriminator" varchar NOT NULL, "administratorId" integer, "customerId" integer, "orderId" integer, CONSTRAINT "FK_92f8c334ef06275f9586fd01832" FOREIGN KEY ("administratorId") REFERENCES "administrator" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_43ac602f839847fdb91101f30ec" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_3a05127e67435b4d2332ded7c9e" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_history_entry"("createdAt", "updatedAt", "type", "isPublic", "data", "id", "discriminator", "administratorId", "customerId", "orderId") SELECT "createdAt", "updatedAt", "type", "isPublic", "data", "id", "discriminator", "administratorId", "customerId", "orderId" FROM "history_entry"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "history_entry"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_history_entry" RENAME TO "history_entry"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f3a761f6bcfabb474b11e1e51f" ON "history_entry" ("discriminator") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7350d77b6474313fbbaf4b094c"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7baeecaf955e54bec73f998b0d"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_zone_members_country" ("zoneId" integer NOT NULL, "countryId" integer NOT NULL, CONSTRAINT "FK_7350d77b6474313fbbaf4b094c1" FOREIGN KEY ("zoneId") REFERENCES "zone" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_7baeecaf955e54bec73f998b0d5" FOREIGN KEY ("countryId") REFERENCES "country" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("zoneId", "countryId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_zone_members_country"("zoneId", "countryId") SELECT "zoneId", "countryId" FROM "zone_members_country"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "zone_members_country"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_zone_members_country" RENAME TO "zone_members_country"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7350d77b6474313fbbaf4b094c" ON "zone_members_country" ("zoneId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7baeecaf955e54bec73f998b0d" ON "zone_members_country" ("countryId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_9e412b00d4c6cee1a4b3d92071"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_fb5e800171ffbe9823f2cc727f"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_asset_tags_tag" ("assetId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "FK_9e412b00d4c6cee1a4b3d920716" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_fb5e800171ffbe9823f2cc727fd" FOREIGN KEY ("tagId") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("assetId", "tagId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_asset_tags_tag"("assetId", "tagId") SELECT "assetId", "tagId" FROM "asset_tags_tag"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "asset_tags_tag"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_asset_tags_tag" RENAME TO "asset_tags_tag"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9e412b00d4c6cee1a4b3d92071" ON "asset_tags_tag" ("assetId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb5e800171ffbe9823f2cc727f" ON "asset_tags_tag" ("tagId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_dc4e7435f9f5e9e6436bebd33b"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_16ca9151a5153f1169da5b7b7e"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_asset_channels_channel" ("assetId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_dc4e7435f9f5e9e6436bebd33bb" FOREIGN KEY ("assetId") REFERENCES "asset" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_16ca9151a5153f1169da5b7b7e3" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("assetId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_asset_channels_channel"("assetId", "channelId") SELECT "assetId", "channelId" FROM "asset_channels_channel"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "asset_channels_channel"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_asset_channels_channel" RENAME TO "asset_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc4e7435f9f5e9e6436bebd33b" ON "asset_channels_channel" ("assetId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_16ca9151a5153f1169da5b7b7e" ON "asset_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6faa7b72422d9c4679e2f186ad"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_fb05887e2867365f236d7dd95e"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_collection_product_variants_product_variant" ("collectionId" integer NOT NULL, "productVariantId" integer NOT NULL, CONSTRAINT "FK_6faa7b72422d9c4679e2f186ad1" FOREIGN KEY ("collectionId") REFERENCES "collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_fb05887e2867365f236d7dd95ee" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("collectionId", "productVariantId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_collection_product_variants_product_variant"("collectionId", "productVariantId") SELECT "collectionId", "productVariantId" FROM "collection_product_variants_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "collection_product_variants_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_collection_product_variants_product_variant" RENAME TO "collection_product_variants_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6faa7b72422d9c4679e2f186ad" ON "collection_product_variants_product_variant" ("collectionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb05887e2867365f236d7dd95e" ON "collection_product_variants_product_variant" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_cdbf33ffb5d451916125152008"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7216ab24077cf5cbece7857dbb"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_collection_channels_channel" ("collectionId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_cdbf33ffb5d4519161251520083" FOREIGN KEY ("collectionId") REFERENCES "collection" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_7216ab24077cf5cbece7857dbbd" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("collectionId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_collection_channels_channel"("collectionId", "channelId") SELECT "collectionId", "channelId" FROM "collection_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "collection_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_collection_channels_channel" RENAME TO "collection_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cdbf33ffb5d451916125152008" ON "collection_channels_channel" ("collectionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7216ab24077cf5cbece7857dbb" ON "collection_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_ca796020c6d097e251e5d6d2b0"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_2a8ea404d05bf682516184db7d"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_facet_channels_channel" ("facetId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_ca796020c6d097e251e5d6d2b02" FOREIGN KEY ("facetId") REFERENCES "facet" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2a8ea404d05bf682516184db7d3" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("facetId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_facet_channels_channel"("facetId", "channelId") SELECT "facetId", "channelId" FROM "facet_channels_channel"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "facet_channels_channel"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_facet_channels_channel" RENAME TO "facet_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca796020c6d097e251e5d6d2b0" ON "facet_channels_channel" ("facetId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a8ea404d05bf682516184db7d" ON "facet_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_ad690c1b05596d7f52e52ffeed"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e1d54c0b9db3e2eb17faaf5919"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_facet_value_channels_channel" ("facetValueId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_ad690c1b05596d7f52e52ffeedd" FOREIGN KEY ("facetValueId") REFERENCES "facet_value" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_e1d54c0b9db3e2eb17faaf5919c" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("facetValueId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_facet_value_channels_channel"("facetValueId", "channelId") SELECT "facetValueId", "channelId" FROM "facet_value_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "facet_value_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_facet_value_channels_channel" RENAME TO "facet_value_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad690c1b05596d7f52e52ffeed" ON "facet_value_channels_channel" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1d54c0b9db3e2eb17faaf5919" ON "facet_value_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6a0558e650d75ae639ff38e413"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_06e7d73673ee630e8ec50d0b29"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_facet_values_facet_value" ("productId" integer NOT NULL, "facetValueId" integer NOT NULL, CONSTRAINT "FK_6a0558e650d75ae639ff38e413a" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_06e7d73673ee630e8ec50d0b29f" FOREIGN KEY ("facetValueId") REFERENCES "facet_value" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("productId", "facetValueId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_facet_values_facet_value"("productId", "facetValueId") SELECT "productId", "facetValueId" FROM "product_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_product_facet_values_facet_value" RENAME TO "product_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6a0558e650d75ae639ff38e413" ON "product_facet_values_facet_value" ("productId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06e7d73673ee630e8ec50d0b29" ON "product_facet_values_facet_value" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_26d12be3b5fec6c4adb1d79284"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a51dfbd87c330c075c39832b6e"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_channels_channel" ("productId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_26d12be3b5fec6c4adb1d792844" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_a51dfbd87c330c075c39832b6e7" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("productId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_channels_channel"("productId", "channelId") SELECT "productId", "channelId" FROM "product_channels_channel"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_channels_channel"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_product_channels_channel" RENAME TO "product_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26d12be3b5fec6c4adb1d79284" ON "product_channels_channel" ("productId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a51dfbd87c330c075c39832b6e" ON "product_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_526f0131260eec308a3bd2b61b"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e96a71affe63c97f7fa2f076da"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_variant_options_product_option" ("productVariantId" integer NOT NULL, "productOptionId" integer NOT NULL, CONSTRAINT "FK_526f0131260eec308a3bd2b61b6" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_e96a71affe63c97f7fa2f076dac" FOREIGN KEY ("productOptionId") REFERENCES "product_option" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("productVariantId", "productOptionId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_variant_options_product_option"("productVariantId", "productOptionId") SELECT "productVariantId", "productOptionId" FROM "product_variant_options_product_option"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_options_product_option"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_product_variant_options_product_option" RENAME TO "product_variant_options_product_option"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_526f0131260eec308a3bd2b61b" ON "product_variant_options_product_option" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e96a71affe63c97f7fa2f076da" ON "product_variant_options_product_option" ("productOptionId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_69567bc225b6bbbd732d6c5455"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0d641b761ed1dce4ef3cd33d55"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_variant_facet_values_facet_value" ("productVariantId" integer NOT NULL, "facetValueId" integer NOT NULL, CONSTRAINT "FK_69567bc225b6bbbd732d6c5455b" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_0d641b761ed1dce4ef3cd33d559" FOREIGN KEY ("facetValueId") REFERENCES "facet_value" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("productVariantId", "facetValueId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_variant_facet_values_facet_value"("productVariantId", "facetValueId") SELECT "productVariantId", "facetValueId" FROM "product_variant_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_product_variant_facet_values_facet_value" RENAME TO "product_variant_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69567bc225b6bbbd732d6c5455" ON "product_variant_facet_values_facet_value" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d641b761ed1dce4ef3cd33d55" ON "product_variant_facet_values_facet_value" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_beeb2b3cd800e589f2213ae99d"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_d194bff171b62357688a5d0f55"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_product_variant_channels_channel" ("productVariantId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_beeb2b3cd800e589f2213ae99d6" FOREIGN KEY ("productVariantId") REFERENCES "product_variant" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d194bff171b62357688a5d0f559" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("productVariantId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_product_variant_channels_channel"("productVariantId", "channelId") SELECT "productVariantId", "channelId" FROM "product_variant_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_product_variant_channels_channel" RENAME TO "product_variant_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_beeb2b3cd800e589f2213ae99d" ON "product_variant_channels_channel" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d194bff171b62357688a5d0f55" ON "product_variant_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_bfd2a03e9988eda6a9d1176011"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e09dfee62b158307404202b43a"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_role_channels_channel" ("roleId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_bfd2a03e9988eda6a9d11760119" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_e09dfee62b158307404202b43a5" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("roleId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_role_channels_channel"("roleId", "channelId") SELECT "roleId", "channelId" FROM "role_channels_channel"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "role_channels_channel"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_role_channels_channel" RENAME TO "role_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfd2a03e9988eda6a9d1176011" ON "role_channels_channel" ("roleId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e09dfee62b158307404202b43a" ON "role_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, CONSTRAINT "FK_5f9286e6c25594c6b88c108db77" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_4be2f7adf862634f5f803d246b8" FOREIGN KEY ("roleId") REFERENCES "role" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("userId", "roleId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_user_roles_role"("userId", "roleId") SELECT "userId", "roleId" FROM "user_roles_role"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "user_roles_role"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_user_roles_role" RENAME TO "user_roles_role"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_b823a3c8bf3b78d3ed68736485"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_85feea3f0e5e82133605f78db0"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_customer_groups_customer_group" ("customerId" integer NOT NULL, "customerGroupId" integer NOT NULL, CONSTRAINT "FK_b823a3c8bf3b78d3ed68736485c" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_85feea3f0e5e82133605f78db02" FOREIGN KEY ("customerGroupId") REFERENCES "customer_group" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("customerId", "customerGroupId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_customer_groups_customer_group"("customerId", "customerGroupId") SELECT "customerId", "customerGroupId" FROM "customer_groups_customer_group"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "customer_groups_customer_group"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_customer_groups_customer_group" RENAME TO "customer_groups_customer_group"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b823a3c8bf3b78d3ed68736485" ON "customer_groups_customer_group" ("customerId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_85feea3f0e5e82133605f78db0" ON "customer_groups_customer_group" ("customerGroupId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a842c9fe8cd4c8ff31402d172d"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_dc9f69207a8867f83b0fd257e3"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_customer_channels_channel" ("customerId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_a842c9fe8cd4c8ff31402d172d7" FOREIGN KEY ("customerId") REFERENCES "customer" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_dc9f69207a8867f83b0fd257e30" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("customerId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_customer_channels_channel"("customerId", "channelId") SELECT "customerId", "channelId" FROM "customer_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "customer_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_customer_channels_channel" RENAME TO "customer_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a842c9fe8cd4c8ff31402d172d" ON "customer_channels_channel" ("customerId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc9f69207a8867f83b0fd257e3" ON "customer_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a568a3d5aa7f237edab624960b"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_8132041a647c28eb27ecc1691f"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_item_fulfillments_fulfillment" ("orderItemId" integer NOT NULL, "fulfillmentId" integer NOT NULL, CONSTRAINT "FK_a568a3d5aa7f237edab624960b9" FOREIGN KEY ("orderItemId") REFERENCES "order_item" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_8132041a647c28eb27ecc1691fa" FOREIGN KEY ("fulfillmentId") REFERENCES "fulfillment" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("orderItemId", "fulfillmentId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_item_fulfillments_fulfillment"("orderItemId", "fulfillmentId") SELECT "orderItemId", "fulfillmentId" FROM "order_item_fulfillments_fulfillment"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "order_item_fulfillments_fulfillment"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_order_item_fulfillments_fulfillment" RENAME TO "order_item_fulfillments_fulfillment"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a568a3d5aa7f237edab624960b" ON "order_item_fulfillments_fulfillment" ("orderItemId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8132041a647c28eb27ecc1691f" ON "order_item_fulfillments_fulfillment" ("fulfillmentId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a48502a38aded69d087a8ec08a"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_9d631d7bd3d44af50eca535d72"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_modification_order_items_order_item" ("orderModificationId" integer NOT NULL, "orderItemId" integer NOT NULL, CONSTRAINT "FK_a48502a38aded69d087a8ec08ad" FOREIGN KEY ("orderModificationId") REFERENCES "order_modification" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_9d631d7bd3d44af50eca535d728" FOREIGN KEY ("orderItemId") REFERENCES "order_item" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("orderModificationId", "orderItemId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_modification_order_items_order_item"("orderModificationId", "orderItemId") SELECT "orderModificationId", "orderItemId" FROM "order_modification_order_items_order_item"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "order_modification_order_items_order_item"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_order_modification_order_items_order_item" RENAME TO "order_modification_order_items_order_item"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a48502a38aded69d087a8ec08a" ON "order_modification_order_items_order_item" ("orderModificationId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9d631d7bd3d44af50eca535d72" ON "order_modification_order_items_order_item" ("orderItemId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6d9e2c39ab12391aaa374bcdaa"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0eaaf0f4b6c69afde1e88ffb52"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_promotion_channels_channel" ("promotionId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_6d9e2c39ab12391aaa374bcdaa4" FOREIGN KEY ("promotionId") REFERENCES "promotion" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_0eaaf0f4b6c69afde1e88ffb52d" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("promotionId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_promotion_channels_channel"("promotionId", "channelId") SELECT "promotionId", "channelId" FROM "promotion_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "promotion_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_promotion_channels_channel" RENAME TO "promotion_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6d9e2c39ab12391aaa374bcdaa" ON "promotion_channels_channel" ("promotionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0eaaf0f4b6c69afde1e88ffb52" ON "promotion_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_f0a17b94aa5a162f0d422920eb"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_f2b98dfb56685147bed509acc3"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_shipping_method_channels_channel" ("shippingMethodId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_f0a17b94aa5a162f0d422920eb2" FOREIGN KEY ("shippingMethodId") REFERENCES "shipping_method" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_f2b98dfb56685147bed509acc3d" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("shippingMethodId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_shipping_method_channels_channel"("shippingMethodId", "channelId") SELECT "shippingMethodId", "channelId" FROM "shipping_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "shipping_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_shipping_method_channels_channel" RENAME TO "shipping_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0a17b94aa5a162f0d422920eb" ON "shipping_method_channels_channel" ("shippingMethodId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2b98dfb56685147bed509acc3" ON "shipping_method_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_67be0e40122ab30a62a9817efe"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_2c26b988769c0e3b0120bdef31"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_promotions_promotion" ("orderId" integer NOT NULL, "promotionId" integer NOT NULL, CONSTRAINT "FK_67be0e40122ab30a62a9817efe0" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_2c26b988769c0e3b0120bdef31b" FOREIGN KEY ("promotionId") REFERENCES "promotion" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("orderId", "promotionId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_promotions_promotion"("orderId", "promotionId") SELECT "orderId", "promotionId" FROM "order_promotions_promotion"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "order_promotions_promotion"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_order_promotions_promotion" RENAME TO "order_promotions_promotion"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_67be0e40122ab30a62a9817efe" ON "order_promotions_promotion" ("orderId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2c26b988769c0e3b0120bdef31" ON "order_promotions_promotion" ("promotionId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0d8e5c204480204a60e151e485"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_d0d16db872499e83b15999f8c7"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_order_channels_channel" ("orderId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_0d8e5c204480204a60e151e4853" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_d0d16db872499e83b15999f8c7a" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("orderId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_order_channels_channel"("orderId", "channelId") SELECT "orderId", "channelId" FROM "order_channels_channel"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "order_channels_channel"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "temporary_order_channels_channel" RENAME TO "order_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d8e5c204480204a60e151e485" ON "order_channels_channel" ("orderId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0d16db872499e83b15999f8c7" ON "order_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_5bcb569635ce5407eb3f264487"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_c00e36f667d35031087b382e61"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "temporary_payment_method_channels_channel" ("paymentMethodId" integer NOT NULL, "channelId" integer NOT NULL, CONSTRAINT "FK_5bcb569635ce5407eb3f264487d" FOREIGN KEY ("paymentMethodId") REFERENCES "payment_method" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_c00e36f667d35031087b382e61b" FOREIGN KEY ("channelId") REFERENCES "channel" ("id") ON DELETE CASCADE ON UPDATE CASCADE, PRIMARY KEY ("paymentMethodId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "temporary_payment_method_channels_channel"("paymentMethodId", "channelId") SELECT "paymentMethodId", "channelId" FROM "payment_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "payment_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "temporary_payment_method_channels_channel" RENAME TO "payment_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5bcb569635ce5407eb3f264487" ON "payment_method_channels_channel" ("paymentMethodId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c00e36f667d35031087b382e61" ON "payment_method_channels_channel" ("channelId") `,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `DROP INDEX "IDX_c00e36f667d35031087b382e61"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_5bcb569635ce5407eb3f264487"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "payment_method_channels_channel" RENAME TO "temporary_payment_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "payment_method_channels_channel" ("paymentMethodId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("paymentMethodId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "payment_method_channels_channel"("paymentMethodId", "channelId") SELECT "paymentMethodId", "channelId" FROM "temporary_payment_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_payment_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c00e36f667d35031087b382e61" ON "payment_method_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5bcb569635ce5407eb3f264487" ON "payment_method_channels_channel" ("paymentMethodId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_d0d16db872499e83b15999f8c7"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0d8e5c204480204a60e151e485"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "order_channels_channel" RENAME TO "temporary_order_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_channels_channel" ("orderId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("orderId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "order_channels_channel"("orderId", "channelId") SELECT "orderId", "channelId" FROM "temporary_order_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_order_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d0d16db872499e83b15999f8c7" ON "order_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d8e5c204480204a60e151e485" ON "order_channels_channel" ("orderId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_2c26b988769c0e3b0120bdef31"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_67be0e40122ab30a62a9817efe"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "order_promotions_promotion" RENAME TO "temporary_order_promotions_promotion"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_promotions_promotion" ("orderId" integer NOT NULL, "promotionId" integer NOT NULL, PRIMARY KEY ("orderId", "promotionId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "order_promotions_promotion"("orderId", "promotionId") SELECT "orderId", "promotionId" FROM "temporary_order_promotions_promotion"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_order_promotions_promotion"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2c26b988769c0e3b0120bdef31" ON "order_promotions_promotion" ("promotionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_67be0e40122ab30a62a9817efe" ON "order_promotions_promotion" ("orderId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_f2b98dfb56685147bed509acc3"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_f0a17b94aa5a162f0d422920eb"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "shipping_method_channels_channel" RENAME TO "temporary_shipping_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_method_channels_channel" ("shippingMethodId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("shippingMethodId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "shipping_method_channels_channel"("shippingMethodId", "channelId") SELECT "shippingMethodId", "channelId" FROM "temporary_shipping_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_shipping_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f2b98dfb56685147bed509acc3" ON "shipping_method_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_f0a17b94aa5a162f0d422920eb" ON "shipping_method_channels_channel" ("shippingMethodId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0eaaf0f4b6c69afde1e88ffb52"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6d9e2c39ab12391aaa374bcdaa"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "promotion_channels_channel" RENAME TO "temporary_promotion_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "promotion_channels_channel" ("promotionId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("promotionId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "promotion_channels_channel"("promotionId", "channelId") SELECT "promotionId", "channelId" FROM "temporary_promotion_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_promotion_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0eaaf0f4b6c69afde1e88ffb52" ON "promotion_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6d9e2c39ab12391aaa374bcdaa" ON "promotion_channels_channel" ("promotionId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_9d631d7bd3d44af50eca535d72"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a48502a38aded69d087a8ec08a"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "order_modification_order_items_order_item" RENAME TO "temporary_order_modification_order_items_order_item"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_modification_order_items_order_item" ("orderModificationId" integer NOT NULL, "orderItemId" integer NOT NULL, PRIMARY KEY ("orderModificationId", "orderItemId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "order_modification_order_items_order_item"("orderModificationId", "orderItemId") SELECT "orderModificationId", "orderItemId" FROM "temporary_order_modification_order_items_order_item"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_order_modification_order_items_order_item"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9d631d7bd3d44af50eca535d72" ON "order_modification_order_items_order_item" ("orderItemId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a48502a38aded69d087a8ec08a" ON "order_modification_order_items_order_item" ("orderModificationId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_8132041a647c28eb27ecc1691f"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a568a3d5aa7f237edab624960b"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "order_item_fulfillments_fulfillment" RENAME TO "temporary_order_item_fulfillments_fulfillment"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_item_fulfillments_fulfillment" ("orderItemId" integer NOT NULL, "fulfillmentId" integer NOT NULL, PRIMARY KEY ("orderItemId", "fulfillmentId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "order_item_fulfillments_fulfillment"("orderItemId", "fulfillmentId") SELECT "orderItemId", "fulfillmentId" FROM "temporary_order_item_fulfillments_fulfillment"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_order_item_fulfillments_fulfillment"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8132041a647c28eb27ecc1691f" ON "order_item_fulfillments_fulfillment" ("fulfillmentId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a568a3d5aa7f237edab624960b" ON "order_item_fulfillments_fulfillment" ("orderItemId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_dc9f69207a8867f83b0fd257e3"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a842c9fe8cd4c8ff31402d172d"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "customer_channels_channel" RENAME TO "temporary_customer_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer_channels_channel" ("customerId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("customerId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "customer_channels_channel"("customerId", "channelId") SELECT "customerId", "channelId" FROM "temporary_customer_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_customer_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc9f69207a8867f83b0fd257e3" ON "customer_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a842c9fe8cd4c8ff31402d172d" ON "customer_channels_channel" ("customerId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_85feea3f0e5e82133605f78db0"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_b823a3c8bf3b78d3ed68736485"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "customer_groups_customer_group" RENAME TO "temporary_customer_groups_customer_group"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer_groups_customer_group" ("customerId" integer NOT NULL, "customerGroupId" integer NOT NULL, PRIMARY KEY ("customerId", "customerGroupId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "customer_groups_customer_group"("customerId", "customerGroupId") SELECT "customerId", "customerGroupId" FROM "temporary_customer_groups_customer_group"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_customer_groups_customer_group"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_85feea3f0e5e82133605f78db0" ON "customer_groups_customer_group" ("customerGroupId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b823a3c8bf3b78d3ed68736485" ON "customer_groups_customer_group" ("customerId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles_role" RENAME TO "temporary_user_roles_role"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles_role" ("userId" integer NOT NULL, "roleId" integer NOT NULL, PRIMARY KEY ("userId", "roleId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "user_roles_role"("userId", "roleId") SELECT "userId", "roleId" FROM "temporary_user_roles_role"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_user_roles_role"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_4be2f7adf862634f5f803d246b" ON "user_roles_role" ("roleId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_5f9286e6c25594c6b88c108db7" ON "user_roles_role" ("userId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e09dfee62b158307404202b43a"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_bfd2a03e9988eda6a9d1176011"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "role_channels_channel" RENAME TO "temporary_role_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "role_channels_channel" ("roleId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("roleId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "role_channels_channel"("roleId", "channelId") SELECT "roleId", "channelId" FROM "temporary_role_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_role_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e09dfee62b158307404202b43a" ON "role_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_bfd2a03e9988eda6a9d1176011" ON "role_channels_channel" ("roleId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_d194bff171b62357688a5d0f55"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_beeb2b3cd800e589f2213ae99d"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_channels_channel" RENAME TO "temporary_product_variant_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_channels_channel" ("productVariantId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("productVariantId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_variant_channels_channel"("productVariantId", "channelId") SELECT "productVariantId", "channelId" FROM "temporary_product_variant_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_variant_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d194bff171b62357688a5d0f55" ON "product_variant_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_beeb2b3cd800e589f2213ae99d" ON "product_variant_channels_channel" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0d641b761ed1dce4ef3cd33d55"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_69567bc225b6bbbd732d6c5455"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_facet_values_facet_value" RENAME TO "temporary_product_variant_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_facet_values_facet_value" ("productVariantId" integer NOT NULL, "facetValueId" integer NOT NULL, PRIMARY KEY ("productVariantId", "facetValueId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_variant_facet_values_facet_value"("productVariantId", "facetValueId") SELECT "productVariantId", "facetValueId" FROM "temporary_product_variant_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_variant_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0d641b761ed1dce4ef3cd33d55" ON "product_variant_facet_values_facet_value" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_69567bc225b6bbbd732d6c5455" ON "product_variant_facet_values_facet_value" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e96a71affe63c97f7fa2f076da"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_526f0131260eec308a3bd2b61b"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_options_product_option" RENAME TO "temporary_product_variant_options_product_option"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_options_product_option" ("productVariantId" integer NOT NULL, "productOptionId" integer NOT NULL, PRIMARY KEY ("productVariantId", "productOptionId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_variant_options_product_option"("productVariantId", "productOptionId") SELECT "productVariantId", "productOptionId" FROM "temporary_product_variant_options_product_option"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_variant_options_product_option"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e96a71affe63c97f7fa2f076da" ON "product_variant_options_product_option" ("productOptionId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_526f0131260eec308a3bd2b61b" ON "product_variant_options_product_option" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a51dfbd87c330c075c39832b6e"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_26d12be3b5fec6c4adb1d79284"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_channels_channel" RENAME TO "temporary_product_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_channels_channel" ("productId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("productId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_channels_channel"("productId", "channelId") SELECT "productId", "channelId" FROM "temporary_product_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a51dfbd87c330c075c39832b6e" ON "product_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_26d12be3b5fec6c4adb1d79284" ON "product_channels_channel" ("productId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_06e7d73673ee630e8ec50d0b29"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6a0558e650d75ae639ff38e413"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_facet_values_facet_value" RENAME TO "temporary_product_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_facet_values_facet_value" ("productId" integer NOT NULL, "facetValueId" integer NOT NULL, PRIMARY KEY ("productId", "facetValueId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_facet_values_facet_value"("productId", "facetValueId") SELECT "productId", "facetValueId" FROM "temporary_product_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_06e7d73673ee630e8ec50d0b29" ON "product_facet_values_facet_value" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6a0558e650d75ae639ff38e413" ON "product_facet_values_facet_value" ("productId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e1d54c0b9db3e2eb17faaf5919"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_ad690c1b05596d7f52e52ffeed"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "facet_value_channels_channel" RENAME TO "temporary_facet_value_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_value_channels_channel" ("facetValueId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("facetValueId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "facet_value_channels_channel"("facetValueId", "channelId") SELECT "facetValueId", "channelId" FROM "temporary_facet_value_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_facet_value_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e1d54c0b9db3e2eb17faaf5919" ON "facet_value_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ad690c1b05596d7f52e52ffeed" ON "facet_value_channels_channel" ("facetValueId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_2a8ea404d05bf682516184db7d"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_ca796020c6d097e251e5d6d2b0"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "facet_channels_channel" RENAME TO "temporary_facet_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_channels_channel" ("facetId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("facetId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "facet_channels_channel"("facetId", "channelId") SELECT "facetId", "channelId" FROM "temporary_facet_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_facet_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_2a8ea404d05bf682516184db7d" ON "facet_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ca796020c6d097e251e5d6d2b0" ON "facet_channels_channel" ("facetId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7216ab24077cf5cbece7857dbb"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_cdbf33ffb5d451916125152008"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "collection_channels_channel" RENAME TO "temporary_collection_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection_channels_channel" ("collectionId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("collectionId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "collection_channels_channel"("collectionId", "channelId") SELECT "collectionId", "channelId" FROM "temporary_collection_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_collection_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7216ab24077cf5cbece7857dbb" ON "collection_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_cdbf33ffb5d451916125152008" ON "collection_channels_channel" ("collectionId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_fb05887e2867365f236d7dd95e"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6faa7b72422d9c4679e2f186ad"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "collection_product_variants_product_variant" RENAME TO "temporary_collection_product_variants_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection_product_variants_product_variant" ("collectionId" integer NOT NULL, "productVariantId" integer NOT NULL, PRIMARY KEY ("collectionId", "productVariantId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "collection_product_variants_product_variant"("collectionId", "productVariantId") SELECT "collectionId", "productVariantId" FROM "temporary_collection_product_variants_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_collection_product_variants_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fb05887e2867365f236d7dd95e" ON "collection_product_variants_product_variant" ("productVariantId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6faa7b72422d9c4679e2f186ad" ON "collection_product_variants_product_variant" ("collectionId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_16ca9151a5153f1169da5b7b7e"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_dc4e7435f9f5e9e6436bebd33b"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "asset_channels_channel" RENAME TO "temporary_asset_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "asset_channels_channel" ("assetId" integer NOT NULL, "channelId" integer NOT NULL, PRIMARY KEY ("assetId", "channelId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "asset_channels_channel"("assetId", "channelId") SELECT "assetId", "channelId" FROM "temporary_asset_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_asset_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_16ca9151a5153f1169da5b7b7e" ON "asset_channels_channel" ("channelId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_dc4e7435f9f5e9e6436bebd33b" ON "asset_channels_channel" ("assetId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_fb5e800171ffbe9823f2cc727f"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_9e412b00d4c6cee1a4b3d92071"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "asset_tags_tag" RENAME TO "temporary_asset_tags_tag"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "asset_tags_tag" ("assetId" integer NOT NULL, "tagId" integer NOT NULL, PRIMARY KEY ("assetId", "tagId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "asset_tags_tag"("assetId", "tagId") SELECT "assetId", "tagId" FROM "temporary_asset_tags_tag"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_asset_tags_tag"`, undefined);
    await queryRunner.query(
      `CREATE INDEX "IDX_fb5e800171ffbe9823f2cc727f" ON "asset_tags_tag" ("tagId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_9e412b00d4c6cee1a4b3d92071" ON "asset_tags_tag" ("assetId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7baeecaf955e54bec73f998b0d"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7350d77b6474313fbbaf4b094c"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "zone_members_country" RENAME TO "temporary_zone_members_country"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "zone_members_country" ("zoneId" integer NOT NULL, "countryId" integer NOT NULL, PRIMARY KEY ("zoneId", "countryId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "zone_members_country"("zoneId", "countryId") SELECT "zoneId", "countryId" FROM "temporary_zone_members_country"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_zone_members_country"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7baeecaf955e54bec73f998b0d" ON "zone_members_country" ("countryId") `,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7350d77b6474313fbbaf4b094c" ON "zone_members_country" ("zoneId") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_f3a761f6bcfabb474b11e1e51f"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "history_entry" RENAME TO "temporary_history_entry"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "history_entry" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar NOT NULL, "isPublic" boolean NOT NULL, "data" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discriminator" varchar NOT NULL, "administratorId" integer, "customerId" integer, "orderId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "history_entry"("createdAt", "updatedAt", "type", "isPublic", "data", "id", "discriminator", "administratorId", "customerId", "orderId") SELECT "createdAt", "updatedAt", "type", "isPublic", "data", "id", "discriminator", "administratorId", "customerId", "orderId" FROM "temporary_history_entry"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_history_entry"`, undefined);
    await queryRunner.query(
      `CREATE INDEX "IDX_f3a761f6bcfabb474b11e1e51f" ON "history_entry" ("discriminator") `,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e5598363000cab9d9116bd5835"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_232f8e85d7633bd6ddfad42169"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "session" RENAME TO "temporary_session"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "token" varchar NOT NULL, "expires" datetime NOT NULL, "invalidated" boolean NOT NULL, "authenticationStrategy" varchar, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "activeOrderId" integer, "activeChannelId" integer, "type" varchar NOT NULL, "userId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "session"("createdAt", "updatedAt", "token", "expires", "invalidated", "authenticationStrategy", "id", "activeOrderId", "activeChannelId", "type", "userId") SELECT "createdAt", "updatedAt", "token", "expires", "invalidated", "authenticationStrategy", "id", "activeOrderId", "activeChannelId", "type", "userId" FROM "temporary_session"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_session"`, undefined);
    await queryRunner.query(
      `CREATE INDEX "IDX_e5598363000cab9d9116bd5835" ON "session" ("type") `,
      undefined
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_232f8e85d7633bd6ddfad42169" ON "session" ("token") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "administrator" RENAME TO "temporary_administrator"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "administrator" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "emailAddress" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, CONSTRAINT "UQ_154f5c538b1576ccc277b1ed631" UNIQUE ("emailAddress"), CONSTRAINT "REL_1966e18ce6a39a82b19204704d" UNIQUE ("userId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "administrator"("createdAt", "updatedAt", "deletedAt", "firstName", "lastName", "emailAddress", "id", "userId") SELECT "createdAt", "updatedAt", "deletedAt", "firstName", "lastName", "emailAddress", "id", "userId" FROM "temporary_administrator"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_administrator"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "tax_rate" RENAME TO "temporary_tax_rate"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "tax_rate" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "name" varchar NOT NULL, "enabled" boolean NOT NULL, "value" decimal(5,2) NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "categoryId" integer, "zoneId" integer, "customerGroupId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "tax_rate"("createdAt", "updatedAt", "name", "enabled", "value", "id", "categoryId", "zoneId", "customerGroupId") SELECT "createdAt", "updatedAt", "name", "enabled", "value", "id", "categoryId", "zoneId", "customerGroupId" FROM "temporary_tax_rate"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_tax_rate"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "order" RENAME TO "temporary_order"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "state" varchar NOT NULL, "active" boolean NOT NULL DEFAULT (1), "orderPlacedAt" datetime, "couponCodes" text NOT NULL, "shippingAddress" text NOT NULL, "billingAddress" text NOT NULL, "currencyCode" varchar NOT NULL, "subTotal" integer NOT NULL, "subTotalWithTax" integer NOT NULL, "shipping" integer NOT NULL DEFAULT (0), "shippingWithTax" integer NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "taxZoneId" integer, "customerId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "order"("createdAt", "updatedAt", "code", "state", "active", "orderPlacedAt", "couponCodes", "shippingAddress", "billingAddress", "currencyCode", "subTotal", "subTotalWithTax", "shipping", "shippingWithTax", "id", "taxZoneId", "customerId") SELECT "createdAt", "updatedAt", "code", "state", "active", "orderPlacedAt", "couponCodes", "shippingAddress", "billingAddress", "currencyCode", "subTotal", "subTotalWithTax", "shipping", "shippingWithTax", "id", "taxZoneId", "customerId" FROM "temporary_order"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_order"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "shipping_line" RENAME TO "temporary_shipping_line"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_line" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "adjustments" text NOT NULL, "taxLines" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "shippingMethodId" integer NOT NULL, "orderId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "shipping_line"("createdAt", "updatedAt", "listPrice", "listPriceIncludesTax", "adjustments", "taxLines", "id", "shippingMethodId", "orderId") SELECT "createdAt", "updatedAt", "listPrice", "listPriceIncludesTax", "adjustments", "taxLines", "id", "shippingMethodId", "orderId" FROM "temporary_shipping_line"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_shipping_line"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "shipping_method_translation" RENAME TO "temporary_shipping_method_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_method_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL DEFAULT (''), "description" varchar NOT NULL DEFAULT (''), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "shipping_method_translation"("createdAt", "updatedAt", "languageCode", "name", "description", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "description", "id", "baseId" FROM "temporary_shipping_method_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_shipping_method_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "order_modification" RENAME TO "temporary_order_modification"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_modification" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "note" varchar NOT NULL, "priceChange" integer NOT NULL, "shippingAddressChange" text, "billingAddressChange" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer, "paymentId" integer, "refundId" integer, CONSTRAINT "REL_ad2991fa2933ed8b7f86a71633" UNIQUE ("paymentId"), CONSTRAINT "REL_cb66b63b6e97613013795eadbd" UNIQUE ("refundId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "order_modification"("createdAt", "updatedAt", "note", "priceChange", "shippingAddressChange", "billingAddressChange", "id", "orderId", "paymentId", "refundId") SELECT "createdAt", "updatedAt", "note", "priceChange", "shippingAddressChange", "billingAddressChange", "id", "orderId", "paymentId", "refundId" FROM "temporary_order_modification"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_order_modification"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "surcharge" RENAME TO "temporary_surcharge"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "surcharge" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "description" varchar NOT NULL, "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "sku" varchar NOT NULL, "taxLines" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer, "orderModificationId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "surcharge"("createdAt", "updatedAt", "description", "listPrice", "listPriceIncludesTax", "sku", "taxLines", "id", "orderId", "orderModificationId") SELECT "createdAt", "updatedAt", "description", "listPrice", "listPriceIncludesTax", "sku", "taxLines", "id", "orderId", "orderModificationId" FROM "temporary_surcharge"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_surcharge"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "order_line" RENAME TO "temporary_order_line"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_line" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productVariantId" integer, "taxCategoryId" integer, "featuredAssetId" integer, "orderId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "order_line"("createdAt", "updatedAt", "id", "productVariantId", "taxCategoryId", "featuredAssetId", "orderId") SELECT "createdAt", "updatedAt", "id", "productVariantId", "taxCategoryId", "featuredAssetId", "orderId" FROM "temporary_order_line"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_order_line"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "order_item" RENAME TO "temporary_order_item"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "order_item" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "initialListPrice" integer, "listPrice" integer NOT NULL, "listPriceIncludesTax" boolean NOT NULL, "adjustments" text NOT NULL, "taxLines" text NOT NULL, "cancelled" boolean NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "lineId" integer NOT NULL, "refundId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "order_item"("createdAt", "updatedAt", "initialListPrice", "listPrice", "listPriceIncludesTax", "adjustments", "taxLines", "cancelled", "id", "lineId", "refundId") SELECT "createdAt", "updatedAt", "initialListPrice", "listPrice", "listPriceIncludesTax", "adjustments", "taxLines", "cancelled", "id", "lineId", "refundId" FROM "temporary_order_item"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_order_item"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "refund" RENAME TO "temporary_refund"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "refund" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "items" integer NOT NULL, "shipping" integer NOT NULL, "adjustment" integer NOT NULL, "total" integer NOT NULL, "method" varchar NOT NULL, "reason" varchar, "state" varchar NOT NULL, "transactionId" varchar, "metadata" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "paymentId" integer NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "refund"("createdAt", "updatedAt", "items", "shipping", "adjustment", "total", "method", "reason", "state", "transactionId", "metadata", "id", "paymentId") SELECT "createdAt", "updatedAt", "items", "shipping", "adjustment", "total", "method", "reason", "state", "transactionId", "metadata", "id", "paymentId" FROM "temporary_refund"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_refund"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "payment" RENAME TO "temporary_payment"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "payment" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "method" varchar NOT NULL, "amount" integer NOT NULL, "state" varchar NOT NULL, "errorMessage" varchar, "transactionId" varchar, "metadata" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "orderId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "payment"("createdAt", "updatedAt", "method", "amount", "state", "errorMessage", "transactionId", "metadata", "id", "orderId") SELECT "createdAt", "updatedAt", "method", "amount", "state", "errorMessage", "transactionId", "metadata", "id", "orderId" FROM "temporary_payment"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_payment"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "customer" RENAME TO "temporary_customer"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "customer" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "title" varchar, "firstName" varchar NOT NULL, "lastName" varchar NOT NULL, "phoneNumber" varchar, "emailAddress" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "userId" integer, "customFieldsCountry_select" varchar(255) NOT NULL DEFAULT (''), CONSTRAINT "REL_3f62b42ed23958b120c235f74d" UNIQUE ("userId"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "customer"("createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "id", "userId", "customFieldsCountry_select") SELECT "createdAt", "updatedAt", "deletedAt", "title", "firstName", "lastName", "phoneNumber", "emailAddress", "id", "userId", "customFieldsCountry_select" FROM "temporary_customer"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_customer"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_a23445b2c942d8dfcae15b8de2"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "authentication_method" RENAME TO "temporary_authentication_method"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "authentication_method" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "identifier" varchar, "passwordHash" varchar, "verificationToken" varchar, "passwordResetToken" varchar, "identifierChangeToken" varchar, "pendingIdentifier" varchar, "strategy" varchar, "externalIdentifier" varchar, "metadata" text, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "type" varchar NOT NULL, "userId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "authentication_method"("createdAt", "updatedAt", "identifier", "passwordHash", "verificationToken", "passwordResetToken", "identifierChangeToken", "pendingIdentifier", "strategy", "externalIdentifier", "metadata", "id", "type", "userId") SELECT "createdAt", "updatedAt", "identifier", "passwordHash", "verificationToken", "passwordResetToken", "identifierChangeToken", "pendingIdentifier", "strategy", "externalIdentifier", "metadata", "id", "type", "userId" FROM "temporary_authentication_method"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_authentication_method"`,
      undefined
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a23445b2c942d8dfcae15b8de2" ON "authentication_method" ("type") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "address" RENAME TO "temporary_address"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "address" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "fullName" varchar NOT NULL DEFAULT (''), "company" varchar NOT NULL DEFAULT (''), "streetLine1" varchar NOT NULL, "streetLine2" varchar NOT NULL DEFAULT (''), "city" varchar NOT NULL DEFAULT (''), "province" varchar NOT NULL DEFAULT (''), "postalCode" varchar NOT NULL DEFAULT (''), "phoneNumber" varchar NOT NULL DEFAULT (''), "defaultShippingAddress" boolean NOT NULL DEFAULT (0), "defaultBillingAddress" boolean NOT NULL DEFAULT (0), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "customerId" integer, "countryId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "address"("createdAt", "updatedAt", "fullName", "company", "streetLine1", "streetLine2", "city", "province", "postalCode", "phoneNumber", "defaultShippingAddress", "defaultBillingAddress", "id", "customerId", "countryId") SELECT "createdAt", "updatedAt", "fullName", "company", "streetLine1", "streetLine2", "city", "province", "postalCode", "phoneNumber", "defaultShippingAddress", "defaultBillingAddress", "id", "customerId", "countryId" FROM "temporary_address"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_address"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "product_variant" RENAME TO "temporary_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "sku" varchar NOT NULL, "stockOnHand" integer NOT NULL DEFAULT (0), "stockAllocated" integer NOT NULL DEFAULT (0), "outOfStockThreshold" integer NOT NULL DEFAULT (0), "useGlobalOutOfStockThreshold" boolean NOT NULL DEFAULT (1), "trackInventory" varchar NOT NULL DEFAULT ('INHERIT'), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer, "featuredAssetId" integer, "taxCategoryId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_variant"("createdAt", "updatedAt", "deletedAt", "enabled", "sku", "stockOnHand", "stockAllocated", "outOfStockThreshold", "useGlobalOutOfStockThreshold", "trackInventory", "id", "productId", "featuredAssetId", "taxCategoryId") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "sku", "stockOnHand", "stockAllocated", "outOfStockThreshold", "useGlobalOutOfStockThreshold", "trackInventory", "id", "productId", "featuredAssetId", "taxCategoryId" FROM "temporary_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_translation" RENAME TO "temporary_product_variant_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_variant_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "temporary_product_variant_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_variant_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_price" RENAME TO "temporary_product_variant_price"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_price" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "price" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "channelId" integer NOT NULL, "variantId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_variant_price"("createdAt", "updatedAt", "price", "id", "channelId", "variantId") SELECT "createdAt", "updatedAt", "price", "id", "channelId", "variantId" FROM "temporary_product_variant_price"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_variant_price"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_variant_asset" RENAME TO "temporary_product_variant_asset"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_variant_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "productVariantId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_variant_asset"("createdAt", "updatedAt", "assetId", "position", "productVariantId", "id") SELECT "createdAt", "updatedAt", "assetId", "position", "productVariantId", "id" FROM "temporary_product_variant_asset"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_variant_asset"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_94e15d5f12d355d117390131ac"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "stock_movement" RENAME TO "temporary_stock_movement"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "stock_movement" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "type" varchar NOT NULL, "quantity" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "discriminator" varchar NOT NULL, "productVariantId" integer, "orderItemId" integer, "orderLineId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "stock_movement"("createdAt", "updatedAt", "type", "quantity", "id", "discriminator", "productVariantId", "orderItemId", "orderLineId") SELECT "createdAt", "updatedAt", "type", "quantity", "id", "discriminator", "productVariantId", "orderItemId", "orderLineId" FROM "temporary_stock_movement"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_stock_movement"`, undefined);
    await queryRunner.query(
      `CREATE INDEX "IDX_94e15d5f12d355d117390131ac" ON "stock_movement" ("discriminator") `,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_option" RENAME TO "temporary_product_option"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_option" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "groupId" integer NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_option"("createdAt", "updatedAt", "deletedAt", "code", "id", "groupId") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "groupId" FROM "temporary_product_option"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_product_option"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "product_option_translation" RENAME TO "temporary_product_option_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_option_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "temporary_product_option_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_option_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group" RENAME TO "temporary_product_option_group"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_group" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "productId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_option_group"("createdAt", "updatedAt", "deletedAt", "code", "id", "productId") SELECT "createdAt", "updatedAt", "deletedAt", "code", "id", "productId" FROM "temporary_product_option_group"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_option_group"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_option_group_translation" RENAME TO "temporary_product_option_group_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_option_group_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_option_group_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "temporary_product_option_group_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_option_group_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product" RENAME TO "temporary_product"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "deletedAt" datetime, "enabled" boolean NOT NULL DEFAULT (1), "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "customFieldsMetadata" text)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product"("createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId", "customFieldsMetadata") SELECT "createdAt", "updatedAt", "deletedAt", "enabled", "id", "featuredAssetId", "customFieldsMetadata" FROM "temporary_product"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_product"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "product_translation" RENAME TO "temporary_product_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "slug" varchar NOT NULL, "description" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_translation"("createdAt", "updatedAt", "languageCode", "name", "slug", "description", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "slug", "description", "id", "baseId" FROM "temporary_product_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_product_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "product_asset" RENAME TO "temporary_product_asset"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "product_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "productId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "product_asset"("createdAt", "updatedAt", "assetId", "position", "productId", "id") SELECT "createdAt", "updatedAt", "assetId", "position", "productId", "id" FROM "temporary_product_asset"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_product_asset"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "facet_value" RENAME TO "temporary_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_value" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "facetId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "facet_value"("createdAt", "updatedAt", "code", "id", "facetId") SELECT "createdAt", "updatedAt", "code", "id", "facetId" FROM "temporary_facet_value"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_facet_value"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "facet_value_translation" RENAME TO "temporary_facet_value_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_value_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "facet_value_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "temporary_facet_value_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_facet_value_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "facet_translation" RENAME TO "temporary_facet_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "facet_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "facet_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "temporary_facet_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_facet_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "collection" RENAME TO "temporary_collection"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "isRoot" boolean NOT NULL DEFAULT (0), "position" integer NOT NULL, "isPrivate" boolean NOT NULL DEFAULT (0), "filters" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "featuredAssetId" integer, "parentId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "collection"("createdAt", "updatedAt", "isRoot", "position", "isPrivate", "filters", "id", "featuredAssetId", "parentId") SELECT "createdAt", "updatedAt", "isRoot", "position", "isPrivate", "filters", "id", "featuredAssetId", "parentId" FROM "temporary_collection"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_collection"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "collection_translation" RENAME TO "temporary_collection_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "slug" varchar NOT NULL, "description" text NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "collection_translation"("createdAt", "updatedAt", "languageCode", "name", "slug", "description", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "slug", "description", "id", "baseId" FROM "temporary_collection_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_collection_translation"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "collection_asset" RENAME TO "temporary_collection_asset"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "collection_asset" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "assetId" integer NOT NULL, "position" integer NOT NULL, "collectionId" integer NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "collection_asset"("createdAt", "updatedAt", "assetId", "position", "collectionId", "id") SELECT "createdAt", "updatedAt", "assetId", "position", "collectionId", "id" FROM "temporary_collection_asset"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_collection_asset"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "channel" RENAME TO "temporary_channel"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "channel" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "code" varchar NOT NULL, "token" varchar NOT NULL, "defaultLanguageCode" varchar NOT NULL, "currencyCode" varchar NOT NULL, "pricesIncludeTax" boolean NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "defaultTaxZoneId" integer, "defaultShippingZoneId" integer, CONSTRAINT "UQ_06127ac6c6d913f4320759971db" UNIQUE ("code"), CONSTRAINT "UQ_842699fce4f3470a7d06d89de88" UNIQUE ("token"))`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "channel"("createdAt", "updatedAt", "code", "token", "defaultLanguageCode", "currencyCode", "pricesIncludeTax", "id", "defaultTaxZoneId", "defaultShippingZoneId") SELECT "createdAt", "updatedAt", "code", "token", "defaultLanguageCode", "currencyCode", "pricesIncludeTax", "id", "defaultTaxZoneId", "defaultShippingZoneId" FROM "temporary_channel"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "temporary_channel"`, undefined);
    await queryRunner.query(
      `ALTER TABLE "country_translation" RENAME TO "temporary_country_translation"`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "country_translation" ("createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "languageCode" varchar NOT NULL, "name" varchar NOT NULL, "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "baseId" integer)`,
      undefined
    );
    await queryRunner.query(
      `INSERT INTO "country_translation"("createdAt", "updatedAt", "languageCode", "name", "id", "baseId") SELECT "createdAt", "updatedAt", "languageCode", "name", "id", "baseId" FROM "temporary_country_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "temporary_country_translation"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_c00e36f667d35031087b382e61"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_5bcb569635ce5407eb3f264487"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "payment_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_d0d16db872499e83b15999f8c7"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0d8e5c204480204a60e151e485"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "order_channels_channel"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_2c26b988769c0e3b0120bdef31"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_67be0e40122ab30a62a9817efe"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "order_promotions_promotion"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_f2b98dfb56685147bed509acc3"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_f0a17b94aa5a162f0d422920eb"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "shipping_method_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0eaaf0f4b6c69afde1e88ffb52"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6d9e2c39ab12391aaa374bcdaa"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "promotion_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_9d631d7bd3d44af50eca535d72"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a48502a38aded69d087a8ec08a"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "order_modification_order_items_order_item"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_8132041a647c28eb27ecc1691f"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a568a3d5aa7f237edab624960b"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "order_item_fulfillments_fulfillment"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_dc9f69207a8867f83b0fd257e3"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a842c9fe8cd4c8ff31402d172d"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "customer_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_85feea3f0e5e82133605f78db0"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_b823a3c8bf3b78d3ed68736485"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "customer_groups_customer_group"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_4be2f7adf862634f5f803d246b"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_5f9286e6c25594c6b88c108db7"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "user_roles_role"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_e09dfee62b158307404202b43a"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_bfd2a03e9988eda6a9d1176011"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "role_channels_channel"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_d194bff171b62357688a5d0f55"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_beeb2b3cd800e589f2213ae99d"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0d641b761ed1dce4ef3cd33d55"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_69567bc225b6bbbd732d6c5455"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e96a71affe63c97f7fa2f076da"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_526f0131260eec308a3bd2b61b"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_variant_options_product_option"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_a51dfbd87c330c075c39832b6e"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_26d12be3b5fec6c4adb1d79284"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_channels_channel"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_06e7d73673ee630e8ec50d0b29"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6a0558e650d75ae639ff38e413"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "product_facet_values_facet_value"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_e1d54c0b9db3e2eb17faaf5919"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_ad690c1b05596d7f52e52ffeed"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "facet_value_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_2a8ea404d05bf682516184db7d"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_ca796020c6d097e251e5d6d2b0"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "facet_channels_channel"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_7216ab24077cf5cbece7857dbb"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_cdbf33ffb5d451916125152008"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "collection_channels_channel"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_fb05887e2867365f236d7dd95e"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6faa7b72422d9c4679e2f186ad"`,
      undefined
    );
    await queryRunner.query(
      `DROP TABLE "collection_product_variants_product_variant"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_16ca9151a5153f1169da5b7b7e"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_dc4e7435f9f5e9e6436bebd33b"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "asset_channels_channel"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_fb5e800171ffbe9823f2cc727f"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_9e412b00d4c6cee1a4b3d92071"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "asset_tags_tag"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_7baeecaf955e54bec73f998b0d"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7350d77b6474313fbbaf4b094c"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "zone_members_country"`, undefined);
    await queryRunner.query(`DROP TABLE "feature_request_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "sort_price_between"`, undefined);
    await queryRunner.query(`DROP TABLE "product_variant_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "connector_channel_entity"`, undefined);
    await queryRunner.query(`DROP TABLE "job_record"`, undefined);
    await queryRunner.query(`DROP TABLE "job_record_buffer"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_9a5a6a556f75c4ac7bfdd03410"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_d8791f444a8bf23fe4c1bc020c"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_6fb55742e13e8082954d0436dc"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "search_index_item"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_f3a761f6bcfabb474b11e1e51f"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "history_entry"`, undefined);
    await queryRunner.query(`DROP TABLE "global_settings"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_e5598363000cab9d9116bd5835"`,
      undefined
    );
    await queryRunner.query(
      `DROP INDEX "IDX_232f8e85d7633bd6ddfad42169"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "session"`, undefined);
    await queryRunner.query(`DROP TABLE "payment_method"`, undefined);
    await queryRunner.query(`DROP TABLE "administrator"`, undefined);
    await queryRunner.query(`DROP TABLE "tax_rate"`, undefined);
    await queryRunner.query(`DROP TABLE "order"`, undefined);
    await queryRunner.query(`DROP TABLE "shipping_line"`, undefined);
    await queryRunner.query(`DROP TABLE "shipping_method"`, undefined);
    await queryRunner.query(
      `DROP TABLE "shipping_method_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "promotion"`, undefined);
    await queryRunner.query(`DROP TABLE "order_modification"`, undefined);
    await queryRunner.query(`DROP TABLE "surcharge"`, undefined);
    await queryRunner.query(`DROP TABLE "order_line"`, undefined);
    await queryRunner.query(`DROP TABLE "order_item"`, undefined);
    await queryRunner.query(`DROP TABLE "refund"`, undefined);
    await queryRunner.query(`DROP TABLE "payment"`, undefined);
    await queryRunner.query(`DROP TABLE "fulfillment"`, undefined);
    await queryRunner.query(`DROP TABLE "customer"`, undefined);
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(`DROP TABLE "role"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_a23445b2c942d8dfcae15b8de2"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "authentication_method"`, undefined);
    await queryRunner.query(`DROP TABLE "customer_group"`, undefined);
    await queryRunner.query(`DROP TABLE "address"`, undefined);
    await queryRunner.query(`DROP TABLE "product_variant"`, undefined);
    await queryRunner.query(
      `DROP TABLE "product_variant_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_variant_price"`, undefined);
    await queryRunner.query(`DROP TABLE "product_variant_asset"`, undefined);
    await queryRunner.query(`DROP TABLE "tax_category"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_94e15d5f12d355d117390131ac"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "stock_movement"`, undefined);
    await queryRunner.query(`DROP TABLE "product_option"`, undefined);
    await queryRunner.query(
      `DROP TABLE "product_option_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product_option_group"`, undefined);
    await queryRunner.query(
      `DROP TABLE "product_option_group_translation"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "product"`, undefined);
    await queryRunner.query(`DROP TABLE "product_translation"`, undefined);
    await queryRunner.query(`DROP TABLE "product_asset"`, undefined);
    await queryRunner.query(`DROP TABLE "facet_value"`, undefined);
    await queryRunner.query(`DROP TABLE "facet_value_translation"`, undefined);
    await queryRunner.query(`DROP TABLE "facet"`, undefined);
    await queryRunner.query(`DROP TABLE "facet_translation"`, undefined);
    await queryRunner.query(`DROP TABLE "collection"`, undefined);
    await queryRunner.query(`DROP TABLE "collection_translation"`, undefined);
    await queryRunner.query(`DROP TABLE "collection_asset"`, undefined);
    await queryRunner.query(`DROP TABLE "asset"`, undefined);
    await queryRunner.query(`DROP TABLE "tag"`, undefined);
    await queryRunner.query(`DROP TABLE "channel"`, undefined);
    await queryRunner.query(`DROP TABLE "zone"`, undefined);
    await queryRunner.query(`DROP TABLE "country"`, undefined);
    await queryRunner.query(`DROP TABLE "country_translation"`, undefined);
  }
}
