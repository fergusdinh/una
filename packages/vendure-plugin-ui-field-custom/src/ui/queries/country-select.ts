import gql from 'graphql-tag';

export const getCountries = gql`
  query countries {
    countries {
      items {
        name
        code
        id
      }
    }
  }
`;
