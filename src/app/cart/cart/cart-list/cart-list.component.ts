import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  SiteService,
  CartService
} from '@/core/service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  loading: boolean = true;
  cartObj: any;
  typenameId: any;

  constructor(
    private apollo: Apollo, 
    private siteService: SiteService,
    private cartService: CartService
  ) {}

 ngOnInit(): void {
  this.siteService.setNav2({
    component: 'CartListComponent'
  });

  console.log('cart list init')
  this.subscription = this.cartService.getResolveCart()
    .valueChanges
    .subscribe( ({data, loading}) => {
      this.loading = loading;
      this.cartObj = data.allShoppingCart.edges;

      const totalAmount = this.cartService.getTotalAmount(this.cartObj);
      this.cartService.totalAmountSrc$.next(totalAmount);
      
      this.typenameId = this.cartService.getTypeNameId(this.cartObj);
  })

 }

 checkAll(e) {
  this.typenameId.forEach(res => {
    localStorage.setItem(res, JSON.stringify(e.checked));
    
    // cache.evict auto refresh once localStorage change?
    this.apollo.client.cache.evict({id: res, fieldName: 'checked' })
  })

 }

 checkProduct(e, pid) {
   const cartTypenameId = `ShoppingCartNode:${pid}`;
   localStorage.setItem(cartTypenameId, JSON.stringify(e.checked));

   // cache.evict auto refresh once localStorage change?
   this.apollo.client.cache.evict({id: cartTypenameId, fieldName: 'checked' })
 }

  updateQuantity(sku, val) {
    this.cartService.updateQuantity(sku, val);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
