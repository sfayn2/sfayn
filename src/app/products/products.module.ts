import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import { 
  ProductsListComponent,
  ProductsDetailComponent,
  ProductsSearchComponent,
} from '@/products/products';
import {
  ProductsRoutingModule
} from './products-routing.module'



@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailComponent,
    ProductsSearchComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule
  ]
})
export class ProductsModule { }
