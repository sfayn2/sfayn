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
  CheckoutPaypalComponent
} from '@/checkout/checkout';



@NgModule({
  declarations: [
    CheckoutPaymentmethodComponent,
    CheckoutPaypalComponent,
    CheckoutAddressComponent,
    CheckoutMainComponent,
    CheckoutItemsComponent,
    CheckoutPlaceorderComponent,
    CheckoutVoucherComponent,
    CheckoutPaymentmethodComponent,
    CheckoutPaypalComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
