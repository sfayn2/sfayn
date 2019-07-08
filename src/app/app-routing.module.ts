import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component'; 
import { ProductsDetailComponent } from './products-detail/products-detail.component'; 
import { ProductsCartComponent } from './products-cart/products-cart.component'; 
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'pl', pathMatch: 'full'},
    { path: 'pl', component: ProductsComponent  },
    { path: 'cart', component: ProductsCartComponent, canActivate: [AuthGuard]  },
    { path: 'pd/:id', component: ProductsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
