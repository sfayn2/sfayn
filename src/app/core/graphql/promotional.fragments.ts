
import gql from 'graphql-tag';

export const GET_ALL_BANNERS = gql`
  query GetALLBanners($user: ID!) {
    allPromotionalbanner(createdBy: $user) {
      edges {
        node {
          id
          name
          imgUrl
          imgUpload
          displayOrder
        }
      }
    }
  }
`