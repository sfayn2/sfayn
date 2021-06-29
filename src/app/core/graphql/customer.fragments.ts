
import gql from 'graphql-tag';


export const GET_ALL_CUSTOMER_ADDRESS = gql`
  query GetAllCustomerAddRess($id: ID!) {
    allCustomeraddress (createdById: $id) {
      edges {
        node {
          id
          phone
          fullname
          address
          postal
          country
          default
          selected @client
          createdBy {
            id
            username
          }
        }
      }
    }
  }
`;