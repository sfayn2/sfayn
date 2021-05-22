import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailComponent } from './products/products-detail/products-detail.component';
import { ProductsSearchComponent } from './products/products-search/products-search.component';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../@shared/shared.module';



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
