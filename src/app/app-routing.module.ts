import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component'; 
import { ProductsDetailComponent } from './products-detail/products-detail.component'; 

const routes: Routes = [
    { path: '', redirectTo: 'pl', pathMatch: 'full'},
    { path: 'pl', component: ProductsComponent  },
    { path: 'pd/:id', component: ProductsDetailComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
