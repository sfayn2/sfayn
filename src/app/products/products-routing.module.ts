import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  ProductsListComponent,
  ProductsDetailComponent
} from '@/products/products';


const routes: Routes = [
  { path: 'list', component: ProductsListComponent },
  { path: 'detail/:id', component: ProductsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }