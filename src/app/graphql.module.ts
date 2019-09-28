import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {  IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { GET_ALL_PRODUCTS, GET_SHOP_CART } from './fragments';
import { typeDefs } from './schema.graphql';
import { introspectionQueryResultData } from './fragmentTypes';
import gql from 'graphql-tag';


const uri = 'http://192.168.1.120:4000/graphql/'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {

    const fragmentMatcher = new IntrospectionFragmentMatcher({
          introspectionQueryResultData
    });

    const cache = new InMemoryCache({ fragmentMatcher })
    cache.writeData({
    data: {
       Nav : {
            id: 1,
            menu: true,
            arrow_back: false,
            side_bar: true,
            component: "AppComponent",
            __typename: "Nav" 
       }
     }
    });


    const resolvers: any = { // strange in order this to work need to provide typeDef :(
      Query: {
        allShopCartAddChecked: (_, variables, { cache }) => {
               const cacheRes = cache.readQuery({
                        variables: { uid: 1 },
                        query: GET_SHOP_CART
                })
               console.log('final cacheRes', cacheRes.edges)
               cacheRes.allShoppingCart.edges.map(x => Object.assign(x.node, {"checked": false}));
               console.log('final cacheRes', cacheRes);
            return { ...cacheRes, __typename: "ShopCartAddCheckedResolver"}
        
        },
        // (START) allProductlist
        allProductslist: (_, variables, { cache }) => {
          const cacheProd = cache.readQuery({query: GET_ALL_PRODUCTS})

          console.log('click resolver!!!!', cacheProd)

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



              console.log('all products AFTER', typeof(cacheProd), cacheProd);
              return { ...cacheProd , __typename: "ProductsListResolver", id: 1  }
         },// (END)  allProductslist 
      }, 
    };

  
  return {
    link: httpLink.create({uri}),
    cache,
    typeDefs, //if u comment this. Apollo GQL will look for server data & not in cache ?
    resolvers
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
