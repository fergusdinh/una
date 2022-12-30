import { gql } from 'graphql-request';
export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($input: DestroyCustomerInput!) {
    destroyCustomer(input: $input) {
      id
      __typename
    }
  }
`;

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      token
    }
  }
`;

export const PLANS = gql`
  query plans(ids: [String!],limit: Int,page: Int) {
    plans(ids: $ids,limit: $limit,page: $page) {
      collection {
        id
      }
    }
  }
`;

export const PLAN = gql`
  query getSinglePlan($id: ID!) {
    plan(id: $id) {
      amountCents
      amountCurrency
      billChargesMonthly
      canBeDeleted
      chargeCount
      createdAt
      description
      id
      code
    }
  }
`;

export const CURRENT_USER_ORGANIZATIONS_ID = gql`
  query currentUser {
    currentUser {
      organizations {
        id
      }
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation createCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      externalId
      name
      email
      id
    }
  }
`;

export const CREATE_SUBSCRIPTION = gql`
  mutation createSubscription($input: CreateSubscriptionInput!) {
    createSubscription(input: $input) {
      id
      externalId
      plan {
        code
        id
        name
        charges {
          billableMetric {
            code
            name
            description
          }
        }
      }
      status
    }
  }
`;
