import gql from 'graphql-tag';

export const schemaExtensions = gql`
  input AddFeatureRequest {
    content: String!
    identifier: String!
  }

  type FeatureRequest implements Node {
    id: ID!
    content: String
  }

  extend type Mutation {
    addFeatureRequest(input: AddFeatureRequest!): FeatureRequest!
  }
`;
