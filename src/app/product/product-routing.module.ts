import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  ProductMainComponent,
  ProductDetailComponent
} from '@/product/product';


const routes: Routes = [
  { path: 'product', component: ProductMainComponent },
  { path: 'product/detail/:id', component: ProductDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }