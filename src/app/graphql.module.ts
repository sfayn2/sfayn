import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { GET_ALL_PRODUCTS } from './fragments';
import { typeDefs } from './schema.graphql';
import { persistCache } from 'apollo-cache-persist';


const uri = 'http://192.168.1.120:4000/graphql/'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink) {

    const cache = new InMemoryCache({
        cacheRedirects: {
                Query: {
                          book: () => {
                              console.log('click resolver')
                              return Date.now()
                          }
                       }
        }
        })
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
     console.log("app module first?")

//    persistCache({cache, storage: window.localStorage});

    const resolvers: any = { // strange in order this to work need to provide typeDef :(
      Query: {
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
    typeDefs,
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
