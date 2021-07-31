
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
      parent {
        id
        name
        level
      }
    }
  }
`;

//export const GET_ALL_PRODUCTS = gql`
//query GetAllProducts {
//  allProductparents {
//    edges {
//      node {
//        id
//        parentSn
//        title
//        goodsDesc
//        ...categoryInfo
//        ...productVariantNode
//        product2variants {
//          edges {
//            node {
//              ...productVariantNode
//              parentSn {
//                id
//                goodsDesc
//                title
//                ...parent2imageInfo
//                ...product2variantsInfo
//              }  
//            }
//          }
//        }
//        ...parent2imageInfo
//      }
//    }
//  }
// }
// ${parent2imageInfo}
// ${product2variantsInfo}
// ${categoryInfo}
// ${productVariantNode}
//`;

export const GET_ALL_PRODUCTS = gql`
query GetAllProducts($keyword: String, $minprice: Float, $maxprice: Float) {
  allProductparents(keyword: $keyword) {
    edges {
      node {
        id
        parentSn
        title
        goodsDesc
        goodsBrand
        ...categoryInfo
        product2variantitem(price_Gte: $minprice, price_Lte: $maxprice) {
          edges {
            node {
              id
              sku
              options
              quantity
              price
              default
              imgUrl
              productVariant {
                id
                name
              }
              parentSn {
                id
                goodsDesc
                title
                ...parent2imageInfo
                product2variantitem {
                  edges {
                    node {
                      id
                      sku
                      options
                      quantity
                      price
                      default
                      imgUrl
                      productVariant {
                        id
                        name
                      }
                    }
                  }
                }
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
 ${categoryInfo}
`;

//export const GET_PRODUCT_DETAIL = gql`
//  fragment ProductVariantDetail on ProductVariantNode {
//    id
//    sku
//    options
//    quantity
//    price
//    default
//    imgUrl
//    productVariant {
//      id
//      name
//    }
//    parentSn {
//      id
//      goodsDesc
//      title
//      ...parent2imageInfo
//      ...product2variantsInfo
//    }  
//  }
// ${parent2imageInfo}
// ${product2variantsInfo}
//`;
//
export const GET_PRODUCT_DETAIL = gql`
  fragment ProductVariantItemDetail on ProductVariantItemNode {
    id
    sku
    options
    quantity
    price
    default
    imgUrl
    productVariant {
      id
      name
    }
    parentSn {
      id
      goodsDesc
      title
      ...parent2imageInfo
      product2variantitem {
        edges {
          node {
            id
            sku
            options
            quantity
            price
            default
            imgUrl
            productVariant {
              id
              name
            }
          }
        }
      }
    }  
  }
  ${parent2imageInfo}
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

