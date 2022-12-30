import gql from 'graphql-tag';

export const getProduct = gql`
  query product($id: ID!) {
    product(id: $id) {
      customFields {
        metadata
      }
    }
  }
`;
