import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent, BottomSheetSubMenu } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import {MaterialModule} from './material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProductsSearchComponent } from './products-search/products-search.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; //this will stop all animations only use for optimization where u dont want to animate
import { ProductsDetailComponent } from './products-detail/products-detail.component';
import { LoginComponent } from './login/login.component';
import { ProductsCartComponent } from './products-cart/products-cart.component';



@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductsSearchComponent,
    ProductsDetailComponent,
    LoginComponent,
    BottomSheetSubMenu,
    ProductsCartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  entryComponents: [LoginComponent, BottomSheetSubMenu],
  providers: [ProductService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor(
        apollo: Apollo,
        httpLink: HttpLink
    ) {

    apollo.create({
    link: httpLink.create({ uri: 'http://192.168.1.120:4000/graphql/' }),
      cache: new InMemoryCache()
      });

   }

}
