import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink} from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import gql from 'graphql-tag'
import { 
  typeDefs,
  GET_RESOLVE_CART,
  WRITE_NAV
} from '@/core/graphql';
import { environment } from '../../environments/environment'; // @Todo: to alias the dir. path

const uri = environment.graphqlUrl // add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink) {

  //@Todo: move to a separat file cache logic . ex. cache.ts?
  const cache = new InMemoryCache({
    typePolicies: {
      ProductNodeConnection: {
        fields: {
          edges: {
            read(edges) {
              // used distinct product display in products list
              return [edges[0]] || []; 
            }
          }
        }
      },
      ProductWarehouseNodeConnection: {
        fields: {
          edges: {
            read(edges) {
              // used distinct warehouse info display in products list
              return [edges[0]] || [];
            }
          }
        }
      },
      ProductOriginalImgNodeConnection: {
        fields: {
          edges: {
            read(edges) {
              // used distinct original img display in products list
              return [edges[0]] || [];
            }
          }
        }
      },
      ShoppingCartNodeConnection: {
        fields: {
          totalAmount() {
            return 0.0
          }
        }
      },
      ShoppingCartNode: {
        fields: {
          checked() {
            return false
          }
        }
      },
    }
  })

  cache.writeQuery({
    query: WRITE_NAV,
    data: { // Contains the data to write
      Nav: {
        id: 1,
        menu: true,
        arrow_back: false,
        side_bar: true,
        component: "AppComponent",
        __typename: "Nav" 
      },
    },
    variables: {
      id: 1
    }
  });


  const resolvers: any = { 
    Mutation: { //START mutation
      getTotalAmount: (_, args, { cache }) => {
        const fragment = gql`
              fragment getTotalAmount on ShoppingCartNodeConnection {
                edges {
                  node {
                    id
                    __typename
                    checked
                    totalPrice
                  }
                }
                totalAmount
              }
            `
        const id = `$ROOT_QUERY.allShoppingCart({"user_Id":1})`
        const cacheCart = cache.readFragment({ fragment, id });
        
        let totalAmount = cacheCart.edges.filter(r => r.node.checked == true).map(r => r.node.totalPrice).reduce((a, b) => parseFloat(a) + parseFloat(b), 0.0)

        const data = { ...cacheCart, totalAmount: totalAmount };
        console.log("getCalculate Amount", data)
        cache.writeFragment({ fragment, id, data });

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
    resolvers,
    connectToDevTools: environment.connectToDevTools // use apollo dev tools
  };
}

@NgModule({
  exports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
