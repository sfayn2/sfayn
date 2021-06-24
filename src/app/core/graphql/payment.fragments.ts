import gql from 'graphql-tag';


export const GET_ALL_PAYMENT_METHOD = gql`
  query GetAllPaymentMethod {
    allPaymentMethod {
        edges {
          node {
            id
            method
            default
          }
        }
      }
  }
`;