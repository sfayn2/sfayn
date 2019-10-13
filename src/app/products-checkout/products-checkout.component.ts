import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_NAV } from '../fragments';

@Component({
  selector: 'app-products-checkout',
  templateUrl: './products-checkout.component.html',
  styleUrls: ['./products-checkout.component.scss']
})
export class ProductsCheckoutComponent implements OnInit {

  constructor(private apollo: Apollo) { 

    apollo.getClient().writeFragment({
        id: 'Nav:1',
        fragment: GET_NAV,
        data: { 
        side_bar: false,
        menu: false,
        arrow_back: true,
        component: 'ProductsCheckoutComponent',
        __typename: 'Nav'
      }, 
    })

  }

  ngOnInit() {
  }

}
