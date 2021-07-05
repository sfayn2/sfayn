import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { 
  PaymentMainComponent,
} from '@/payment/payment';



const routes: Routes = [
  { path: 'payment/:id', component: PaymentMainComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule{ }