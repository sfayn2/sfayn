import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import {
  CheckoutRoutingModule
} from './checkout-routing.module';
import { 
  CheckoutAddressComponent,
  CheckoutTotalComponent,
  CheckoutPaymentComponent,
  CheckoutMainComponent,
  CheckoutItemsComponent
} from '@/checkout/checkout';



@NgModule({
  declarations: [
    CheckoutPaymentComponent,
    CheckoutAddressComponent,
    CheckoutTotalComponent,
    CheckoutMainComponent,
    CheckoutItemsComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }
