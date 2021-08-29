
import gql from 'graphql-tag';

export const WRITE_NAV = gql`
  fragment myNav on Nav {
    arrow_back
    side_bar
    menu
    login
    user
    token
    component
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