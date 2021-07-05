import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import {
  PaymentRoutingModule
} from './payment-routing.module';
import {
  PaymentMainComponent,
  PaymentPaypalComponent,
  PaymentCompletionComponent,
  PaymentConfirmationComponent,
} from '@/payment/payment';


@NgModule({
  declarations: [
    PaymentMainComponent,
    PaymentPaypalComponent,
    PaymentCompletionComponent,
    PaymentConfirmationComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule { }
