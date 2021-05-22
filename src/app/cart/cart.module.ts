import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartListComponent } from './cart/cart-list/cart-list.component';
import { CartRoutingModule } from './cart-routing.module';
import { CartAmountComponent } from './cart/cart-amount/cart-amount.component';
import { SharedModule } from '../@shared/shared.module';



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
