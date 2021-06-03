import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { 
  GET_NAV, 
  GET_RESOLVE_CART 
} from '@/core/graphql';
import {
  MakevarService
} from '@/core/service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  selectedProducts: string[] = [];
  loading: boolean = true;
  cart$: any;
  cartTypenameId: any;

  constructor(
    private apollo: Apollo, 
    private makeVar: MakevarService
  ) {

  apollo.client.writeFragment({
      id: 'Nav:1',
      fragment: GET_NAV,
      data: { 
      side_bar: false,
      menu: false,
      arrow_back: true,
      component: 'ShoppingCartComponent',
      __typename: 'Nav'
    }, 
  })

 }

 ngOnInit() {
  this.getResolveCart()
 }

 getResolveCart() { 
   this.apollo.watchQuery<any>({
     query: GET_RESOLVE_CART,
     variables: { 
       uid: 1 
     }
   })
   .valueChanges
   .subscribe( ({data, loading}) => {
     this.loading = loading;
     this.cart$ = data.allShoppingCart.edges;

     // get total Amount
     const totalAmount = this.cart$
        .filter(res => res.node.checked == true)
        .map(res => res.node.totalPrice)
        .reduce((a, b) => a + b, 0.0)
     this.makeVar.totalAmountSrc$.next(totalAmount);

     this.cartTypenameId = this.cart$
        .map(res => res.node)
        .map(res => `${res.__typename}:${res.id}`)
     
   })

 }

 checkAll(e) {
  this.cartTypenameId.forEach(res => {
    localStorage.setItem(res, JSON.stringify(e.checked));
    console.log(e.checked, res)
    
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
   this.apollo.mutate({
     mutation: gql`
       mutation ShopCartPerUser($user: ID!, $sku: ID!, $qty: ID!, $mode: ID!) {
         shoppingCart(user: $user, product: $sku, quantity: $qty, mode: $mode) {
           shoppingCart {
             id
             quantity
             totalPrice
           }
         }
       }
     `,
     variables: { user: 1, sku: sku, qty: val, mode: 1},
   }).subscribe()
 }


}
