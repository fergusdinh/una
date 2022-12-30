import gql from 'graphql-tag';
export const schema = gql`
  enum BillingTimeEnum {
    calendar
    anniversary
  }

  input CreateShopperInput {
    email_address: String!
    first_name: String!
    last_name: String!
    password: String!
    plan_id: String!
    provider_customer_id: String
    billing_time: BillingTimeEnum!
  }

  extend type Mutation {
    createShopper(input: CreateShopperInput!): Administrator!
  }
`;
