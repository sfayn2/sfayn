import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  CheckoutMainComponent,
} from './checkout/checkout-main/checkout-main.component';


const routes: Routes = [
  { path: 'checkout', component: CheckoutMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule{ }