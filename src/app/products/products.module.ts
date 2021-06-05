import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@/shared';
import { 
  ProductsListComponent,
  ProductsDetailComponent,
  ProductsSearchComponent,
} from '@/products/products';
import {
  ProductsRoutingModule
} from './products-routing.module'
import { CoreModule } from '@/core';



@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailComponent,
    ProductsSearchComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    CoreModule,
    FormsModule,
    //ReactiveFormsModule
  ]
})
export class ProductsModule { }
