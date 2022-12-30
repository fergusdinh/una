export type ConnectorType =
  | 'shopify'
  | 'magento'
  | 'woocommerce'
  | 'bigcommerce';

export type ShopifySettings = {
  url: string;
  api_version: string;
  shopify_access_token_offline: string;
  shopify_access_token_online: string;
};

export type BigCommerceSettings = {
  url: string;
  client_id: string;
  access_token: string;
};

export type WooCommerceSettings = {
  consumer_key: string;
  consumer_secret: string;
  version: string;
  url: string;
};

export type ChannelSettings<Obj> = Obj extends ShopifySettings
  ? ShopifySettings
  : Obj extends BigCommerceSettings
  ? BigCommerceSettings
  : Obj extends WooCommerceSettings
  ? WooCommerceSettings
  : never;

/* 
    - CS ==> ChannelSettings 
    - EAR ==> EmptyArrayField
*/
export function schemaConfigData<
  T extends {},
  CS extends ShopifySettings | BigCommerceSettings | WooCommerceSettings,
  EAR extends {}
>(
  rawConfigData: T,
  channelSettings: ChannelSettings<CS>,
  connectorType: ConnectorType,
  fieldConfig: {
    setFieldName?: string;
    configFieldName?: string;
    transformFieldName?: string;
  },
  arrayField?: Required<EAR>
) {
  return {
    ops: {
      ...(fieldConfig.setFieldName && {
        [fieldConfig.setFieldName]: {
          config: {
            ...(fieldConfig.configFieldName && {
              [fieldConfig.configFieldName]: {
                ...rawConfigData,
                ...arrayField,
              },
            }),
          },
        },
      }),
      ...(fieldConfig.transformFieldName && {
        [fieldConfig.transformFieldName]: {
          config: {
            attributes_mapping: 1,
          },
        },
      }),
    },
    ...resources(channelSettings, connectorType),
  };
}

export function resources<
  CS extends BigCommerceSettings | ShopifySettings | WooCommerceSettings
>(channelSettings: ChannelSettings<CS>, connectorType: ConnectorType) {
  if (connectorType === 'shopify') {
    return {
      resources: {
        shopify: {
          config: {
            shop_url: channelSettings.url,
            api_version:
              'api_version' in channelSettings
                ? channelSettings.api_version
                : '',
            access_token:
              'shopify_access_token_offline' in channelSettings
                ? channelSettings.shopify_access_token_offline
                : '',
          },
        },
      },
    };
  } else if (connectorType === 'bigcommerce') {
    return {
      resources: {
        bigcommerce: {
          config: {
            store_hash: channelSettings.url,
            client_id:
              'client_id' in channelSettings ? channelSettings.client_id : '',
            access_token:
              'access_token' in channelSettings
                ? channelSettings.access_token
                : '',
          },
        },
      },
    };
  } else if (connectorType === 'woocommerce') {
    return {
      resources: {
        woocommerce: {
          config: {
            consumer_key:
              'consumer_key' in channelSettings
                ? channelSettings.consumer_key
                : '',
            consumer_secret:
              'consumer_secret' in channelSettings
                ? channelSettings.consumer_secret
                : '',
            url: 'url' in channelSettings ? channelSettings.url : '',
            version:
              'version' in channelSettings ? channelSettings.version : '',
          },
        },
      },
    };
  }
  return;
}
