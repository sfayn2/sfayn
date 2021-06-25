
import gql from 'graphql-tag';


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
  query ShopCartPerUserResolver($id: ID!) {
    allShopcart(createdBy_Id: $id  ) {
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
