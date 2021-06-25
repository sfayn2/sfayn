
import gql from 'graphql-tag';

export const TOKEN_AUTH_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        token
      }
    }
`;

export const VERIFY_TOKEN_MUTATION = gql`
    mutation VerifyToken($token: String!) {
      verifyToken(token: $token) {
        payload
      }
    }
`;

export const GET_NAV = gql`
  fragment myNav on Nav {
    arrow_back
    side_bar
    menu
    component
  }
`;

export const WRITE_NAV = gql`
  query WriteNav($id: Int!) {
    Nav(id: $id) {
      id
      menu
      arrow_back
      side_bar
      component
      __typename
    }
  }
`;