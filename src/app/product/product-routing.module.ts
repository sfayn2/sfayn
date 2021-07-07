import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  ProductListComponent,
  ProductDetailComponent
} from '@/product/product';


const routes: Routes = [
  { path: 'product/list', component: ProductListComponent },
  { path: 'product/detail/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }