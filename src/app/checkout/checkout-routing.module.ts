import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  CheckoutMainComponent,
  CheckoutPaypalComponent
} from '@/checkout/checkout';



const routes: Routes = [
  { path: 'checkout', component: CheckoutMainComponent },
  { path: 'checkout-paypal', component: CheckoutPaypalComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule{ }