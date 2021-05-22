import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersAddressComponent } from './customers-address/customers-address.component';
import { CustomersRoutingModule } from './customers-routing.modules';
import { SharedModule } from '../@shared/shared.module';



@NgModule({
  declarations: [
    CustomersAddressComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule
  ]
})
export class CustomersModule { }
