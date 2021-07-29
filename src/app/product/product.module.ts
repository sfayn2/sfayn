import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@/shared';
import { 
  ProductListComponent,
  ProductDetailComponent,
  ProductSearchComponent,
  ProductCategoryComponent,
  ProductMainComponent,
  ProductBannerComponent
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
    ProductCategoryComponent,
    ProductBannerComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
