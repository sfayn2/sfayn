import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartAmountComponent } from './cart/cart-amount/cart-amount.component';


const routes: Routes = [
  { path: 'cart/list', component: CartListComponent },
  { path: 'cart/amount', component: CartAmountComponent, outlet: 'amount' }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }