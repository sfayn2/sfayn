
import gql from 'graphql-tag';

export const ADD_CART = gql`
  mutation AddCart($user: ID!, $sku: ID!, $qty: ID!) {
    shopcart(user: $user, sku: $sku, quantity: $qty, mode: 0) {
      ok
    }
  }
`;

// need to provide the __typename & id to use it for cache.evict
export const DELETE_CART = gql`
  mutation DeleteCart($user: ID!, $sku: ID!) {
    shopcart(user: $user, sku: $sku, mode: 2) {
      ok
      shopcart {
        id
        totalPrice
      }    
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateShopCart($user: ID!, $sku: ID!, $qty: ID!, $mode: ID!) {
    shopcart(user: $user, sku: $sku, quantity: $qty, mode: $mode) {
      ok
      shopcart {
        id
        totalPrice
        quantity
      }    
    }
  }
`