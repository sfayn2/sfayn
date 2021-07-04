import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import {
  PaymentRoutingModule
} from './payment-routing.module';
import {
  PaymentCompletionComponent,
  PaymentMainComponent,
  PaymentPaypalComponent
} from '@/payment/payment';


@NgModule({
  declarations: [
    PaymentCompletionComponent,
    PaymentPaypalComponent,
    PaymentMainComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule { }
