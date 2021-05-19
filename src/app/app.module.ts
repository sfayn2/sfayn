import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
//import { ApolloModule, Apollo } from 'apollo-angular';
//import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';

import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { ProductsGQLService } from './products-graphql.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {MaterialModule} from './material-module';
import { ProductsSearchComponent } from './products-search/products-search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; //this will stop all animations only use for optimization where u dont want to animate
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { LoginComponent } from './login/login.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';
import { ProductsCartAmountComponent } from './products-cart-amount/products-cart-amount.component';
import { GraphQLModule } from './graphql.module';
import { ProductsCheckoutComponent } from './products-checkout/products-checkout.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductsSearchComponent,
    ProductsDetailComponent,
    LoginComponent,
    ProductsCartComponent,
    ProductsCartAmountComponent,
    ProductsCheckoutComponent,
    ShippingAddressComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    GraphQLModule,
  ],
  entryComponents: [LoginComponent, ShippingAddressComponent],
  providers: [ProductService, AuthService, ProductsGQLService],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor() {

//    const cache = new InMemoryCache()
//
//    const resolvers: any = {
//      Query: {
//        // (START) allProductlist
//        allProductslist: (_, variables, { cache }) => {
//          const cacheProd = cache.readQuery({query: GET_ALL_PRODUCTS})
//
//          console.log('click resolver!!!!')
//
//          for (let [key1, value1] of Object.entries(cacheProd.allProductparents.edges)) {
//
//            // lets avoid this error
//            // error TS2339: Property 'node' does not exist on type 'unknown'
//            let key: any; 
//            let value: any;
//            key = key1;
//            value = value1;
//
//            let tmp =  value.node.parent2product.edges
//            if (tmp.length > 0) {
//
//                    // get parent2product first row only
//                    cacheProd.allProductparents.edges[key].node.parent2product.edges = [tmp[0]]
//                    
//                    // get originalimg first row only
//                    let tmp2 = tmp[0].node.originalImg.edges
//                    if (tmp2.length > 0) {
//                       cacheProd.allProductparents.edges[key].node.parent2product.edges[0].node.originalImg.edges = [tmp2[0]]
//                    }
//
//                    // get warehouse first row only
//                    let tmp3 = tmp[0].node.warehouse.edges
//                    if (tmp3.length > 0) {
//                       cacheProd.allProductparents.edges[key].node.parent2product.edges[0].node.warehouse.edges = [tmp3[0]]
//                    }
//            }
//          }
//
//          //console.log('all products AFTER', allProdCache);
//              return { ...cacheProd , __typename: "ProductsListResolver" }
//         },// (END)  allProductslist 
//      }, 
//    };
//
//    apollo.create({
//      link: httpLink.create({ uri: 'http://192.168.1.120:4000/graphql/' }),
//      cache,
//      typeDefs,
//      resolvers  //https://stackoverflow.com/questions/55970271/found-client-directives-in-query-but-no-client-resolvers-were-specified-warni
//      });
//

   }

}
