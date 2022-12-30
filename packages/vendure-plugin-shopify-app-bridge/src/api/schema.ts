import gql from 'graphql-tag';

export const schema = gql`
  extend type Mutation {
    updateShopifyAppBridge(url: String!): String
  }

  extend type Query {
    shopifyAppBridge: String
  }
`;
