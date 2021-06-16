import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import {
  CheckoutRoutingModule
} from './checkout-routing.module';
import { 
  CheckoutListComponent,
  CheckoutAddressComponent,
  CheckoutTotalComponent,
  CheckoutPaymentComponent
} from '@/checkout/checkout';



@NgModule({
  declarations: [
    CheckoutListComponent,
    CheckoutPaymentComponent,
    CheckoutAddressComponent,
    CheckoutTotalComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
