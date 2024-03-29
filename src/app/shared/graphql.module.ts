import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink} from 'apollo-angular/http';
import { InMemoryCache, createHttpLink, ApolloClientOptions } from '@apollo/client/core';
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import { setContext } from '@apollo/client/link/context';
//import { onError } from "apollo-link-error";
//import { from } from "rxjs";

import { 
  typeDefs,
  GET_NAV,
} from '@/core/graphql';
import { environment } from '../../environments/environment'; // @Todo: to alias the dir. path
import {
  MakevarService
} from '@/core/service'

const uri = environment.graphqlUrl // add the URL of the GraphQL server here

const httpLink2 = createHttpLink({
  uri
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const session = JSON.parse(localStorage.getItem('apollo-cache-persist'))

  //const token = localStorage.getItem('token');
  const token = session ? session['Nav:1'].token : null ;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `JWT ${token}` : "",
    }
  }
});

//const errorLink = onError(({ graphQLErrors, networkError }) => {
//  if (graphQLErrors)
//    graphQLErrors.map(({ message, locations, path }) => {
//      console.log(
//        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
//      );
//
//    });
//  if (networkError) console.log(`[Network error]: ${networkError}`);
//});



export function createApollo(httpLink: HttpLink, makeVar: MakevarService): ApolloClientOptions<any> {

  //@Todo: move to a separat file cache logic . ex. cache.ts?
  const cache = new InMemoryCache({
    typePolicies: {
      ShopCartNode: {
        fields: {
          checked(_, { readField }) {
            const typenameId = `${readField('__typename')}:${readField('id')}`;
            return JSON.parse(localStorage.getItem(typenameId)) // null if cannot find 
          },
        }
      },
      PaymentMethodNode: {
        fields: {
          selected(_, { readField }) {
            return makeVar.setSelectedValue(readField);
          },
        }
      },
      CustomerAddressNode: {
        fields: {
          selected(_, { readField }) {
            return makeVar.setSelectedValue(readField);
          },
        }
      },
      PromotionalBannerNode: {
        fields: {
          imgUpload(name) {
            return name ? `${environment.mediaUrl}${name}`: name;
          },
          //default(_, { readField }) {
          //  console.log('imgUpload', readField('imgUpload'))
          //  console.log('imgUrl', readField('imgUrl'))
          //  return 'imgUpladddd'
          //},
        }
      }
    }
  })

  cache.writeQuery({
    query: GET_NAV,
    data: { // Contains the data to write
      Nav: {
        id: 1,
        menu: true,
        arrow_back: false,
        side_bar: true,
        login: false,
        user: 'Anonymous',
        token: '',
        component: "AppComponent",
        __typename: "Nav" 
      },
    },
    variables: {
      id: 1
    }
  });

  // @Todo await before instantiating ApolloClient, else queries might run before the cache is persisted
  persistCache({
    cache,
    storage: new LocalStorageWrapper(window.localStorage),
  });

  
  return {
    //link: httpLink.create({uri}),
    link: authLink.concat(httpLink2),
    cache,
    defaultOptions: {
      watchQuery: {
        errorPolicy: 'all',
      },
    },
    //typeDefs, //if u comment this. Apollo GQL will look for server data & not in cache when using devTools ?
    connectToDevTools: environment.connectToDevTools // use apollo dev tools
  };
}


@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink, MakevarService],
    },
  ],
})
export class GraphQLModule {}
