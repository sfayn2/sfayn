
import gql from 'graphql-tag';

export const TOKEN_AUTH = gql`
    mutation Login($username: String!, $password: String!) {
      tokenAuth(username: $username, password: $password) {
        token
      }
    }
`;

export const VERIFY_TOKEN = gql`
    mutation VerifyToken($token: String!) {
      verifyToken(token: $token) {
        payload
      }
    }
`;

export const WRITE_AUTH = gql`
  query WriteAuth($id: Int!) {
    Auth(id: $id) {
      token
      user
      __typename
    }
  }
`;