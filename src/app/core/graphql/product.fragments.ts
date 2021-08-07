
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

export const categoryInfo = gql`
  fragment categoryInfo on ProductParentNode {
    category {
      id
      name
      level
      parent {
        id
        name
        level
      }
    }
  }
`;

export const productVariantInfo = gql`
  fragment productVariantInfo on ProductVariantItemNode {
    productVariant {
      id
      name
    }
  }
`
export const parentSnInfo = gql`
  fragment parentSnInfo on ProductVariantItemNode {
    parentSn {
      id
      goodsBrand
      goodsDesc
      title
      priceRange
      ...parent2imageInfo
      ...categoryInfo
      product2variantitem {
        edges {
          node {
            id
            options
          }
        }
      }
    }
  }
${parent2imageInfo}
${categoryInfo}
`;

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts(
  $keyword: String, 
  $orderBy: String, 
  $minprice: Float, 
  $maxprice: Float,
  $default: Boolean
) {
  allProductvariantitems(
    orderBy: $orderBy, 
    keyword: $keyword,
    price_Gte: $minprice,
    price_Lte: $maxprice,
    default: $default
  ) {
    edges {
      node {
        id
        sku
        options
        quantity
        price
        default
        imgUrl
        ...productVariantInfo
        ...parentSnInfo
      }
    }
  }
}
${parentSnInfo}
${productVariantInfo}
`

export const GET_PRODUCT_DETAIL = gql`
  fragment ProductVariantItemDetail on ProductVariantItemNode {
    id
    sku
    options
    quantity
    price
    default
    imgUrl
    ...productVariantInfo
    ...parentSnInfo
  }
  ${parentSnInfo}
  ${productVariantInfo}
`;


export const GET_ALL_CATEGORY = gql`
query GetALLCategory($id: [ID], $level: String) {
  allProductcategory(id: $id, level: $level) {
    edges {
      node {
        productcategorySet {
          edges {
            node {
              id
              name
              parent {
                id
              }
            }
          }
        }          
        id
        name
        level
      }
    }
  }
}
`;

