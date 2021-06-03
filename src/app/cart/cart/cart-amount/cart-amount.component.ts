import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag'
import { 
  GET_NAV, 
  GET_RESOLVE_CART 
} from '@/core/graphql';
import { Router } from '@angular/router';
import {
  MakevarService
} from '@/core/service';

@Component({
  selector: 'app-cart-amount',
  templateUrl: './cart-amount.component.html',
  styleUrls: ['./cart-amount.component.scss']
})
export class CartAmountComponent implements OnInit {

  totalAmount: number = 0;

  constructor(
    private apollo: Apollo,
    private makeVar: MakevarService,
    private router: Router
  ) { 

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

  ngOnInit(): void {
    this.makeVar.totalAmount$.subscribe(
      res => this.totalAmount = res
    )
  }

  goCheckout() {
    this.router.navigate([{ outlets: {primary: 'checkout', amount: null }}])
  }

}
