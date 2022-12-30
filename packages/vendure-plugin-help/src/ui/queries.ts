import gql from 'graphql-tag';

export const createFeatureRequest = gql`
  mutation AddFeatureRequest($input: AddFeatureRequest!) {
    addFeatureRequest(input: $input) {
      id
      content
    }
  }
`;

export const getCurrentUser = gql`
  query me {
    me {
      id
      identifier
      channels {
        id
        token
        code
      }
    }
  }
`;
