import gql from 'graphql-tag';

export const updateConnectorMutation = gql`
  mutation updateConnector($settings: String!, $type: String!) {
    updateConnector(settings: $settings, type: $type) {
      id
    }
  }
`;

export const checkShopifyDomainIsExsit = gql`
  query checkShopifyDomainIsExsit($shopifyDomain: String!) {
    checkShopifyDomainIsExsit(shopifyDomain: $shopifyDomain)
  }
`;
