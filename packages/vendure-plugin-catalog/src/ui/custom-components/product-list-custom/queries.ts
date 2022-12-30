import gql from 'graphql-tag';

export const getDataProduct = gql`
  query searchProduct($input: SearchInput!) {
    search(input: $input) {
      totalItems
      items {
        slug
        enabled
        productId
        productName
        productVariantId
        productVariantName
        sku
        inStock
        totalVariant
        totalAvailable
        price {
          ... on SinglePrice {
            value
          }
          ... on PriceRange {
            min
            max
          }
          __typename
        }
        productAsset {
          id
          preview
          focalPoint {
            x
            y
          }
        }
        productVariantAsset {
          id
          preview
          focalPoint {
            x
            y
          }
        }
        sku
        channelIds
      }
      facetValues {
        facetValue {
          id
          createdAt
          updatedAt
          name
          __typename
          facet {
            id
            createdAt
            updatedAt
            __typename
          }
        }
        count
      }
    }
  }
`;
