import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs } from './schema.graphql';
import { introspectionQueryResultData } from './fragmentTypes';
import { IResolvers } from 'graphql-tools';
import { GET_RESOLVE_CART } from './fragments';
import gql from 'graphql-tag'


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


  const resolvers: IResolvers = { 
    ShoppingCartNodeConnection: {
      totalAmount: () => 0.0 
    },
    ShoppingCartNode: {
      checked: (parent) => false,
    },
    ProductWarehouseNodeConnection: {
      edges: (parent) => {
        parent.edges = [parent.edges[0]]
        return parent.edges
      } 
    },
    ProductOriginalImgNodeConnection: {
      edges: (parent) => {
        parent.edges = [parent.edges[0]]
          return parent.edges
         } 
    },
    ProductNodeConnection: {
      edges: (parent,  args ) => {
        console.log(args)
	      if (parent.edges.length > 0) {
          parent.edges = [parent.edges[0]]
	      }
        return parent.edges
      } 
    },
    Query: {
    
    }, 

    Mutation: { //START mutation
      calculateTotalAmount: (_, args, { cache }) => {
        const cacheCart = cache.readQuery({ 
          query: GET_RESOLVE_CART,
          variables: { uid: 1}
        });

          // modify total Amount value
        let totalAmount = cacheCart.allShoppingCart.edges.filter(x => x.node.checked == true).map(res => { 
          return res.node.product.warehouse.edges.map(res2 => res2.node.price*res.node.quantity)
        }).reduce((a, b) => parseFloat(a) + parseFloat(b), 0.0) // default 0.0 if no array 
        cacheCart.allShoppingCart = Object.assign(cacheCart.allShoppingCart, {totalAmount: totalAmount })
        console.log('resolver', cacheCart.allShoppingCart)

        cache.writeQuery({ 
          query: GET_RESOLVE_CART, 
          variables: { uid: 1},
          data: cacheCart
        });

        return null

      },
      checkCartItem: (_, args, { cache, getCacheKey }) => {
        const id = getCacheKey({ id: args.id, __typename: 'ShoppingCartNode' });
        const fragment = gql`
          fragment cartToChecked on ShoppingCartNode {
            checked
          }
        `;
        const cart = cache.readFragment({ fragment, id });
        const data = { ...cart, checked: args.checked };
        cache.writeFragment({ fragment, id, data });
        return null;
      },
      toggleCheckedCart: (_, args, { cache }) => { // START toggleCheckedCart
        const cacheCart = cache.readQuery({ 
          query: GET_RESOLVE_CART,
          variables: { uid: 1}
        });

        cacheCart.allShoppingCart.edges.map(res => Object.assign(res.node, {checked: args.checked } ))
        cache.writeQuery({ 
          query: GET_RESOLVE_CART, 
          variables: { uid: 1},
          data: cacheCart
        });
	      return null
	    } // END toggleCheckedCart
    }, // END mutation

  };

  
  return {
    link: httpLink.create({uri}),
    cache,
    typeDefs, //if u comment this. Apollo GQL will look for server data & not in cache when using devTools ?
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
