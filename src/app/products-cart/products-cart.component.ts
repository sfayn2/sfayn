import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { GET_NAV, GET_RESOLVE_CART } from '../fragments';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {

  selectedProducts: string[] = [];
  loading: boolean = true;
  cart$: any;
  private subscription: Subscription;

  constructor(private apollo: Apollo) {

    apollo.getClient().writeFragment({
        id: 'Nav:1',
        fragment: GET_NAV,
        data: { 
        side_bar: false,
        menu: false,
        arrow_back: true,
        component: 'ProductsCartComponent',
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
      this.calculateTotalAmount()
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
      this.calculateTotalAmount()
      console.log('mutate check product', res)
    })

  }

  calculateTotalAmount() {
    this.apollo.mutate({
      mutation: gql`
       mutation {
        calculateTotalAmount @client 
      }`,
    })
    .subscribe(_ => {
      console.log('mutate check product calculate total amount in products-cart', _)
    })

  }



  updateQuantity(sku, val) {
    this.apollo.mutate({
      mutation: gql`
        mutation ShopCartPerUser($user: ID!, $sku: ID!, $qty: ID!, $mode: ID!) {
          shoppingCart(user: $user, product: $sku, quantity: $qty, mode: $mode) {
            shoppingCart {
              dateModified
            }
          }
        }
      `,
      variables: { user: 1, sku: sku, qty: val, mode: 1},
      refetchQueries: [{
        query: GET_RESOLVE_CART,
        variables: { 
          uid: 1 
        }
      }]
    }).subscribe()
  }



}
