
import gql from 'graphql-tag';


const originalImgInfo = gql`
    fragment originalImgInfo on ProductOriginalImgNodeEdge {
        node {
  	    originalImg
         }
    }
`;

const warehouseInfo = gql`
    fragment warehouseInfo on ProductWarehouseNodeEdge {
        node {
            warehouse
            price
            goodsState
            goodsNumber
        }
    }
`;

const parent2productInfo = gql`
    fragment parent2productInfo on ProductNodeEdge {
        node {
  	    id
  	    title
  	    sku
  	    parentId
  	    color
  	    originalImg (first: $first) {
    	        edges {
      	            ...originalImgInfo   
    	        }
  	    }
  	    warehouse (first: $first) {
    	        edges {
      	            ...warehouseInfo                  
    	        }
  	    }
        }
    }
    ${originalImgInfo}
    ${warehouseInfo}
`;

export const QUERY_PRODUCTS = gql`
    query SearchProductByCategory($first: Int = 1, $catId: String!) 
        {
            allProductparents{
                edges {
                  node {
                    parent2product (first: $first , cat_CatId_In: $catId) {
                      edges {
                            ...parent2productInfo
                      }
                    }
                  }
                }
            }
     }
     ${parent2productInfo}
`;

export const QUERY_ALL_PRODUCTS = gql`
    query SearchProductByCategory($first: Int = 1) 
        {
            allProductparents{
                edges {
                  node {
                    parent2product (first: $first) {
                      edges {
                            ...parent2productInfo
                      }
                    }
                  }
                }
            }
     }
     ${parent2productInfo}
`;


export const QUERY_CATEGORY = gql`
{
  level1: allProductcategory (level: 1) {
    edges {
      node {
        catName
        parentId
        catId
        level
      }
    }
  }
  level2: allProductcategory (level: 2) {
    edges {
      node {        
        catId
        catName
        level
        parentId
      }
    }
  }
  level3: allProductcategory (level: 3) {
    edges {
      node {
        catId
        catName
        level
        parentId
      }
    }
  }
}

`;
