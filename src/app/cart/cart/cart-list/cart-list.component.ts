import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import {
  SiteService,
  CartService,
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

  constructor(
    private apollo: Apollo, 
    private siteService: SiteService,
    private cartService: CartService,
  ) {}

 ngOnInit(): void {
  this.siteService.setNav2({
    component: 'CartListComponent'
  });

  this.subscription = this.cartService.obj$.subscribe(res => {
    this.cartObj = res.obj;
  })

 }

  checkAll(e) {
    const typeNameId = this.cartService.objSrc$.getValue().typeNameId;
    typeNameId.forEach(res => {
      localStorage.setItem(res, JSON.stringify(e.checked));
      
        // cache.evict auto refresh once localStorage change?
      this.apollo.client.cache.evict({id: res, fieldName: 'checked' })
    })
  }

 checkProduct(e, pid) {
   const cartTypenameId = `ShopCartNode:${pid}`;
   localStorage.setItem(cartTypenameId, JSON.stringify(e.checked));

   // cache.evict auto refresh once localStorage change?
   this.apollo.client.cache.evict({id: cartTypenameId, fieldName: 'checked' })
 }

  updateQuantity(sku, val) {
    this.cartService.updateQuantity(sku, val);
  }

  deleteCart(sku) {
    // @Todo for now user is hardcoded?
    this.cartService.deleteCart(sku);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
