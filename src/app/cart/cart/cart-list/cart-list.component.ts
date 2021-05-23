import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { 
  GET_NAV, 
  GET_RESOLVE_CART 
} from '@/core/graphql';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss']
})
export class CartListComponent implements OnInit {

  selectedProducts: string[] = [];
  loading: boolean = true;
  cart$: any;

  constructor(private apollo: Apollo) {

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

 getResolveCart() { // add extra field checked, qty, totalAmount in Shop cart cache
   this.apollo.watchQuery<any>({
     query: GET_RESOLVE_CART,
     variables: { 
       uid: 1 
     }
   })
   .valueChanges
   .subscribe( ({data, loading}) => {
     console.log('watching me2?', data)
     this.loading = loading;
     this.cart$ = data.allShoppingCart.edges;
     this.getTotalAmount()
   })
 }

 checkAll(e) {

   this.apollo.mutate({
     mutation: gql`
       mutation {
         toggleCheckedCart (id: 1, checked: ${e.checked}) @client 
       }`,
   })
   .subscribe(res => {
    // this.calculateTotalAmount()
     console.log('mutate check', res)
   })

 }

 checkProduct(e, pid) {
   this.apollo.mutate({
     mutation: gql`
      mutation {
       checkCartItem (id: "${pid}", checked: ${e.checked}) @client 
     }`,
   })
   .subscribe(res => {
     this.getTotalAmount()
     console.log('mutate check product', res)
   })

 }

 getTotalAmount() {
   this.apollo.mutate({
     mutation: gql`
      mutation {
       getTotalAmount @client 
     }`,
   })
   .subscribe(_ => {
     console.log('mutate getTotalAmount in products-cart', _)
   })

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
