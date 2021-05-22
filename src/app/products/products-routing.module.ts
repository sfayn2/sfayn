import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductsDetailComponent } from './products/products-detail/products-detail.component';


const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'detail/:id', component: ProductsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }