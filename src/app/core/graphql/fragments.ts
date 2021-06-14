
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

export const ADD_CART = gql`
  mutation AddCart($user: ID!, $sku: ID!, $qty: ID!) {
    shopcart(user: $user, sku: $sku, quantity: $qty, mode: 0) {
      ok
    }
  }
`;

// need to provide the __typename & id to use it for cache.evict
export const DELETE_CART = gql`
  mutation DeleteCart($user: ID!, $sku: ID!) {
    shopcart(user: $user, sku: $sku, mode: 2) {
      ok
      shopcart {
        id
        totalPrice
      }    
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UpdateShopCart($user: ID!, $sku: ID!, $qty: ID!, $mode: ID!) {
    shopcart(user: $user, sku: $sku, quantity: $qty, mode: $mode) {
      ok
      shopcart {
        id
        totalPrice
        quantity
      }    
    }
  }
`
export const parent2imageInfo = gql`
  fragment parent2imageInfo on ProductParentNode {
    parent2image {
      edges {
        node {
          id
          imgUrl
          coverPhoto
        }
      }
    }
  }
`;


export const productVariantNode = gql`
  fragment productVariantNode on ProductVariantNode {
    id
    sku
    name
    options
    quantity
    price
    default
    imgUrl
  }
`;

export const product2variantsInfo = gql`
  fragment product2variantsInfo on ProductParentNode {
    product2variants {
      edges {
        node {
          ...productVariantNode
        }
      }
    }
  }
  ${productVariantNode}
`;

export const categoryInfo = gql`
  fragment categoryInfo on ProductParentNode {
    category {
      id
      name
      level
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts {
  allProductparents {
    edges {
      node {
        id
        parentSn
        title
        goodsDesc
        ...categoryInfo
        product2variants {
          edges {
            node {
              ...productVariantNode
              parentSn {
                id
                goodsDesc
                title
                ...parent2imageInfo
                ...product2variantsInfo
              }  
            }
          }
        }
        ...parent2imageInfo
      }
    }
  }
 }
 ${parent2imageInfo}
 ${product2variantsInfo}
 ${categoryInfo}
 ${productVariantNode}
`;

export const GET_PRODUCT_DETAIL = gql`
  fragment ProductVariantDetail on ProductVariantNode {
    ...productVariantNode
    parentSn {
      id
      goodsDesc
      title
      ...parent2imageInfo
      ...product2variantsInfo
    }  
  }
 ${parent2imageInfo}
 ${product2variantsInfo}
 ${productVariantNode}
`;


export const GET_ALL_CARTS = gql`
  query ShopCartPerUserResolver($uid: ID!) {
    allShopcart(createdBy_Id: $uid  ) {
      edges {
        node {
          id
          quantity
          totalPrice
          checked @client
          productVariant {
            ...productVariantNode
            parentSn {
              id
              title
              ...parent2imageInfo
            }
          }
        }
      }
    }
  }
  ${parent2imageInfo}
  ${productVariantNode}
`
