import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink} from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import gql from 'graphql-tag'
import { 
  typeDefs,
  GET_RESOLVE_CART,
  WRITE_NAV,
} from '@/core/graphql';
import { environment } from '../../environments/environment'; // @Todo: to alias the dir. path
import {
  MakevarService
} from '@/core/service'

const uri = environment.graphqlUrl // add the URL of the GraphQL server here

export function createApollo(httpLink: HttpLink, makeVar: MakevarService) {

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
      ShoppingCartNode: {
        fields: {
          checked(_, { readField }) {
            const typenameId = `${readField('__typename')}:${readField('id')}`;
            return JSON.parse(localStorage.getItem(typenameId))
          },
          //totalAmount(_, { readField }) {
          //  //  @Todo? 
          //  const checked: boolean = readField('checked');
          //  const totalPrice: number =  readField('totalPrice');
          //  if (checked) {
          //    totalAmount = totalAmount + totalPrice;
          //  } else if (totalAmount > 0) {
          //    totalAmount = totalAmount - totalPrice;
          //  }

          //  return totalAmount;
          //}
        }
      },
      //Query: {
      //  fields: {
      //    allShoppingCart: {
      //      merge(existing, incoming, { cache }) {
      //        console.log('Query.allShoppingCart', existing, incoming)


      //        return { ...incoming };
      //      }
      //    }
      //  }
      //},
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

  
  return {
    link: httpLink.create({uri}),
    cache,
    typeDefs, //if u comment this. Apollo GQL will look for server data & not in cache when using devTools ?
    connectToDevTools: environment.connectToDevTools // use apollo dev tools
  };
}


@NgModule({
  exports: [],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, MakevarService],
    },
  ],
})
export class GraphQLModule {}
