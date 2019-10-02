import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-cache-inmemory';
import { typeDefs } from './schema.graphql';
import { introspectionQueryResultData } from './fragmentTypes';
import { IResolvers } from 'graphql-tools';


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
    ShoppingCartNode: {
      checked: () => false
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
