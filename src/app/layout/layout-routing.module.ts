import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutMainComponent } from '@/layout/layout';
import { AuthGuard } from '@/core/guard';


const routes: Routes = [
{
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: 'customers', loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule) },
      { path: '', loadChildren: () => import('../product/product.module').then(m => m.ProductModule) },
      { path: '', loadChildren: () => import('../checkout/checkout.module').then(m => m.CheckoutModule) },
      { path: '', loadChildren: () => import('../payment/payment.module').then(m => m.PaymentModule) },

      // @todo workaround set path: '' caused auxiliary outlet not working?? 
      { path: '', loadChildren: () => import('../cart/cart.module').then(m => m.CartModule), canLoad: [AuthGuard] },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }