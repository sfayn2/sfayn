
import gql from 'graphql-tag';

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $user: ID!, 
    $payment: ID!, 
    $customerAddress: ID!,
    $totalAmount: Float!) {
    shoporder(input: { 
       customerAddress: $customerAddress, 
       user: $user, 
       payment: $payment, 
       totalAmount: $totalAmount }
    ) {
      ok
      shoporder {
        id
      }
    }
  }
`;

export const CREATE_ORDER_ITEM = gql`
  mutation CreateOrderItem(
    $user: ID!, 
    $order: ID!, 
    $item: ID!,
  ) {
    shoporderitem(input: { 
       user: $user, 
       order: $order, 
       item: $item }
    ) {
      ok
      shoporderitem {
        id
      }
    }
  }
`;


export const GET_ORDER = gql`
query GetOrder($id: ID!) {
  allShoporder(id: $id) {
    edges {
      node {
        id
        status
        paymentMethod {
          id
          method
          default
        }
        totalAmount
      }
    }
  }
}
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder(
    $order: ID!, 
    $status: ID!, 
    ) {
    shoporderstatus (input: { order: $order, status: $status }) {
      ok
      shoporder {
        id
        status
      }
    }
}
`;