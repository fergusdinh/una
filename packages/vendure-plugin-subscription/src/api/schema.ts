import gql from 'graphql-tag';
export const schema = gql`
  extend type Query {
    sassSubscription: String
  }
`;
