
import gql from 'graphql-tag';

export const WRITE_NAV = gql`
  fragment myNav on Nav {
    arrow_back
    side_bar
    menu
    component
  }
`;

// @Todo session should be in site settngs?
export const WRITE_USER_SESSION = gql`
  fragment myNav on Nav {
    login
    user
    token
  }
`;


export const GET_NAV = gql`
  query GetNav($id: Int!) {
    Nav(id: $id) {
      id
      menu
      arrow_back
      side_bar
      login
      user
      token
      component
      __typename
    }
  }
`;