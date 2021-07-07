import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@/shared';
import { 
  ProductListComponent,
  ProductDetailComponent,
  ProductSearchComponent,
  ProductCategoryComponent,
  ProductMainComponent
} from '@/product/product';
import {
  ProductRoutingModule
} from './product-routing.module'
import { CoreModule } from '@/core';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductSearchComponent,
    ProductMainComponent,
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    //ReactiveFormsModule
  ]
})
export class ProductModule { }
