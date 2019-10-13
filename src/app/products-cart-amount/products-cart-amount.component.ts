import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { GET_NAV, GET_RESOLVE_CART } from '../fragments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-cart-amount',
  templateUrl: './products-cart-amount.component.html',
  styleUrls: ['./products-cart-amount.component.scss']
})
export class ProductsCartAmountComponent implements OnInit {

  totalAmount: number = 0;
  constructor(private apollo: Apollo,
              private router: Router) { 

    apollo.getClient().writeFragment({
        id: 'Nav:1',
        fragment: GET_NAV,
        data: { 
        side_bar: false,
        menu: false,
        arrow_back: true,
        component: 'ProductsCartAmountComponent',
        __typename: 'Nav'
      }, 
    })

  }

  ngOnInit() {

    this.getTotalAmount()

  }

  getTotalAmount() {

    this.apollo.watchQuery<any>({
      query: gql`
        query getTotalAmount($uid: ID!) {
          allShoppingCart(user_Id: $uid ){
            totalAmount @client
          }
        }
      `,
      variables: { uid: 1 }
    })
    .valueChanges
    .subscribe( ({data, loading}) => {
      this.totalAmount = data.allShoppingCart.totalAmount;
      console.log('shop cart checked', data)    
    });

  }

  goCheckout() {
    this.router.navigate([{ outlets: {primary: 'checkout', amount: null }}])
  }


}
