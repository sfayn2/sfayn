import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'

@Component({
  selector: 'app-products-cart-checkout',
  templateUrl: './products-cart-checkout.component.html',
  styleUrls: ['./products-cart-checkout.component.scss']
})
export class ProductsCartCheckoutComponent implements OnInit {

  totalAmount: number = 0;
  constructor(private apollo: Apollo) { }

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


}
