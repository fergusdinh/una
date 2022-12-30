import gql from 'graphql-tag';

export const getOrders = gql`
  fragment Order on Order {
    id
    createdAt
    updatedAt
    orderPlacedAt
    code
    state
    nextStates
    total
    totalWithTax
    totalQuantity
    currencyCode
    shippingAddress {
      country
    }
    customer {
      id
      firstName
      lastName
    }
    shippingLines {
      shippingMethod {
        name
      }
    }
  }

  query orders($options: OrderListOptions) {
    orders(options: $options) {
      items {
        ...Order
      }
      totalItems
    }
  }
`;
