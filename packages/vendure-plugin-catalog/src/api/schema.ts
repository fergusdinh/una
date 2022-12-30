import gql from 'graphql-tag';

export const schemaSearchResult = gql`
  extend type SearchResult {
    totalVariant: Int
    totalAvailable: Int
  }
`;

export const schemaSortResult = gql`
  # extend input SearchInput {
  #   priceBetween: String
  # }

  input SortBetween {
    from: Int
    to: Int
  }

  extend type Query {
    searchCustom(sort: SortBetween): String!
  }
`;
