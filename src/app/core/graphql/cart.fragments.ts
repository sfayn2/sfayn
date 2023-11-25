
import gql from 'graphql-tag';
import {
  parent2imageInfo
} from '@/core/graphql/product.fragments';

export const ADD_CART = gql`
  mutation AddCart($user: ID!, $sku: ID!, $qty: ID!) {
    shopcart(input: { user: $user, sku: $sku, quantity: $qty, mode: 0 }) {
      ok
    }
  }
`;

// need to provide the __typename & id to use it for cache.evict
export const DELETE_CART = gql`
  mutation DeleteCart($user: ID!, $sku: ID!) {
    shopcart(input: { user: $user, sku: $sku, mode: 2 }) {
      ok
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateShopCart($user: ID!, $sku: ID!, $qty: ID!, $mode: ID!) {
    shopcart(input: { user: $user, sku: $sku, quantity: $qty, mode: $mode } ) {
      ok
      shopcart {
        id
        totalPrice
        quantity
      }    
    }
  }
`

export const GET_ALL_CARTS = gql`
  query ShopCartPerUserResolver($id: ID!) {
    allShopcart(createdBy_Id: $id  ) {
      edges {
        node {
          cart2orderitem {
            id
          }
          id
          quantity
          totalPrice
          checked @client
          productVariant {
            id
            sku
            options
            quantity
            price
            default
            imgUrl
            productVariant {
              id
              name
            }
            parentSn {
              id
              title
              ...parent2imageInfo
            }
          }
        }
      }
    }
  }
  ${parent2imageInfo}
`