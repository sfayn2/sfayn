import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';


const routes: Routes = [
{
    path: '',
    component: LayoutMainComponent,
    children: [
      { path: 'customers', loadChildren: () => import('../customers/customers.module').then(m => m.CustomersModule) },
      { path: 'products', loadChildren: () => import('../products/products.module').then(m => m.ProductsModule) },
      { path: 'cart', loadChildren: () => import('../cart/cart.module').then(m => m.CartModule) },
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }