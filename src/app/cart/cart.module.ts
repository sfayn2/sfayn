import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import { 
  CartListComponent,
  CartAmountComponent,
} from '@/cart/cart';
import {
  CartRoutingModule
} from './cart-routing.module'



@NgModule({
  declarations: [
    CartListComponent,
    CartAmountComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
