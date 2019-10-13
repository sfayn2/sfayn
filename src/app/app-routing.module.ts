import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component'; 
import { ProductsDetailComponent } from './products-detail/products-detail.component'; 
import { ProductsCartComponent } from './products-cart/products-cart.component'; 
import { ProductsCheckoutComponent } from './products-checkout/products-checkout.component';
import { ProductsCartAmountComponent } from './products-cart-amount/products-cart-amount.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full'},
    { path: 'list', component: ProductsListComponent  },
    { path: 'cart', component: ProductsCartComponent, canActivate: [AuthGuard]  },
    { path: 'checkout', component: ProductsCheckoutComponent },
    { path: 'amount', component: ProductsCartAmountComponent, outlet: 'amount'  },
    { path: 'detail/:id', component: ProductsDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
