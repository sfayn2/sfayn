import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import {
  CheckoutRoutingModule
} from './checkout-routing.module';
import { 
  CheckoutAddressComponent,
  CheckoutPlaceorderComponent,
  CheckoutVoucherComponent,
  CheckoutPaymentmethodComponent,
  CheckoutMainComponent,
  CheckoutItemsComponent,
} from '@/checkout/checkout';



@NgModule({
  declarations: [
    CheckoutPaymentmethodComponent,
    CheckoutAddressComponent,
    CheckoutMainComponent,
    CheckoutItemsComponent,
    CheckoutPlaceorderComponent,
    CheckoutVoucherComponent,
    CheckoutPaymentmethodComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
