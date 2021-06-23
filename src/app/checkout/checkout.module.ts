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
  CheckoutPaymentComponent,
  CheckoutMainComponent,
  CheckoutItemsComponent
} from '@/checkout/checkout';



@NgModule({
  declarations: [
    CheckoutPaymentComponent,
    CheckoutAddressComponent,
    CheckoutMainComponent,
    CheckoutItemsComponent,
    CheckoutPlaceorderComponent,
    CheckoutVoucherComponent,
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
