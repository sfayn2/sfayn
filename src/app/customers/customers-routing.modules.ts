import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomersAddressComponent } from './customers-address/customers-address.component';


const routes: Routes = [
  { path: 'address', component: CustomersAddressComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }