
import gql from 'graphql-tag';

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