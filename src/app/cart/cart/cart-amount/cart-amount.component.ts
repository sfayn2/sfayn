import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { GET_NAV, GET_RESOLVE_CART } from '../../../@core/graphql/fragments';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-amount',
  templateUrl: './cart-amount.component.html',
  styleUrls: ['./cart-amount.component.scss']
})
export class CartAmountComponent implements OnInit {

  totalAmount: number = 0;
  constructor(private apollo: Apollo,
              private router: Router) { 

    apollo.client.writeFragment({
        id: 'Nav:1',
        fragment: GET_NAV,
        data: { 
        side_bar: false,
        menu: false,
        arrow_back: true,
        component: 'CartAmountComponent',
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
