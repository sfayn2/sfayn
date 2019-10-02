
import gql from 'graphql-tag';


export const typeDefs = gql`

  type Nav {
    id: ID!
    menu: Boolean
    arrow_back: Boolean
    side_bar: Boolean
    component: String
  }


  type Query {
    nav: Nav
  }
`;
