import gql from 'graphql-tag';

export const schema = gql`
  # Define type
  type connectorResponse {
    createdAt: DateTime
    updatedAt: DateTime
    type: String
    channelId: String
    settings: String
    id: ID
  }

  type ConnectorsExport {
    type: String
    name: String
    icon: String
    description: String
  }

  # Define Query and Mutation
  extend type Mutation {
    updateConnector(settings: String!, type: String!): connectorResponse
  }

  extend type Query {
    checkShopifyDomainIsExsit(shopifyDomain: String!): Boolean
  }

  extend type Query {
    getAllConnectors: [connectorResponse!]!
  }

  extend type Query {
    getConnectorByType(type: String!): connectorResponse
  }

  extend type Query {
    availableConnectorsExport: [ConnectorsExport!]!
  }

  extend type Query {
    getConnectorConfigUi(type: String!): String
  }

  extend type Query {
    availableEntitiesExport: [String!]!
  }

  extend type Query {
    getAllConnectorsConnectedOfChannel: [connectorResponse!]!
  }

  extend type Mutation {
    deleteConnector: String
  }
`;
