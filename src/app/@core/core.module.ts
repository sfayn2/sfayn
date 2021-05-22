import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from './service/product.service';
import { ProductsGQLService } from './service/products-graphql.service';
import { AuthService } from './service/auth.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ProductService, AuthService, ProductsGQLService],
})
export class CoreModule { }
