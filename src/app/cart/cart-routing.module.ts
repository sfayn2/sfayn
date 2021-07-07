import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  CartMainComponent,
  CartAmountComponent
} from '@/cart/cart';


const routes: Routes = [
  { path: 'cart', component: CartMainComponent },
  { path: 'cart/amount', component: CartAmountComponent, outlet: 'amount' }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }