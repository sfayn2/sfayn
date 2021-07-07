import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import { 
  CartListComponent,
  CartAmountComponent,
  CartMainComponent
} from '@/cart/cart';
import {
  CartRoutingModule
} from './cart-routing.module';



@NgModule({
  declarations: [
    CartListComponent,
    CartAmountComponent,
    CartMainComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    SharedModule
  ]
})
export class CartModule { }
