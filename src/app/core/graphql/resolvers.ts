
import { InMemoryCache } from '@apollo/client/core';
import { GET_ALL_PRODUCTS } from './fragments';
    const cache = new InMemoryCache()
 export  const resolvers: any = {
      Query: {
        // (START) allProductlist
        allProductslist: (_, variables, { cache }) => {
          const cacheProd = cache.readQuery({query: GET_ALL_PRODUCTS})

          for (let [key1, value1] of Object.entries(cacheProd.allProductparents.edges)) {

            // lets avoid this error
            // error TS2339: Property 'node' does not exist on type 'unknown'
            let key: any; 
            let value: any;
            key = key1;
            value = value1;

            let tmp =  value.node.parent2product.edges
            if (tmp.length > 0) {

                    // get parent2product first row only
                    cacheProd.allProductparents.edges[key].node.parent2product.edges = [tmp[0]]
                    
                    // get originalimg first row only
                    let tmp2 = tmp[0].node.originalImg.edges
                    if (tmp2.length > 0) {
                       cacheProd.allProductparents.edges[key].node.parent2product.edges[0].node.originalImg.edges = [tmp2[0]]
                    }

                    // get warehouse first row only
                    let tmp3 = tmp[0].node.warehouse.edges
                    if (tmp3.length > 0) {
                       cacheProd.allProductparents.edges[key].node.parent2product.edges[0].node.warehouse.edges = [tmp3[0]]
                    }
            }
          }

          //console.log('all products AFTER', allProdCache);
              return { ...cacheProd , __typename: "ProductsListResolver" }
         },// (END)  allProductslist 
      }, 
    };
