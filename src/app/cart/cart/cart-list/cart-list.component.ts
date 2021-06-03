import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {
  MakevarService,
  SiteService,
  CartService
} from '@/core/service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  selectedProducts: string[] = [];
  loading: boolean = true;
  cartObj: any;
  cartTypenameId: any;

  constructor(
    private apollo: Apollo, 
    private makeVar: MakevarService,
    private siteService: SiteService,
    private cartService: CartService
  ) {}

 ngOnInit() {
  this.siteService.setNav2({
    component: 'CartListComponent'
  });

  this.cartService.getResolveCart()
    .valueChanges
    .subscribe( ({data, loading}) => {
      this.loading = loading;
      this.cartObj = data.allShoppingCart.edges;

      const totalAmount = this.cartService.getTotalAmount(this.cartObj);
      this.makeVar.totalAmountSrc$.next(totalAmount);
      
      this.cartTypenameId = this.cartService.getTypeNameId(this.cartObj);
  })

 }

 checkAll(e) {
  this.cartTypenameId.forEach(res => {
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

}
