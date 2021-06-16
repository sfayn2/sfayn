import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  CheckoutListComponent,
} from './checkout/checkout-list/checkout-list.component';


const routes: Routes = [
  { path: 'checkout', component: CheckoutListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule{ }