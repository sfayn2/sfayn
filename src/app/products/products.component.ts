import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GET_NAV, GET_PRODUCT_LIST } from '../fragments';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  subscription: Subscription;
  product$: any ;
  loading: boolean = true;
 
  constructor(private apollo: Apollo) {

        apollo.getClient().writeFragment({
              id: 'Nav:1',
              fragment: GET_NAV,
              data: { 
                    side_bar: true,
                    menu: true,
                    arrow_back: false,
                    component: 'ProductsComponent',
                    __typename: 'Nav'
              }, 
         })
 }

  ngOnInit() {
     this.subscription = this.apollo.watchQuery<any>({
        query: GET_PRODUCT_LIST
     }).valueChanges
     .subscribe(({ data, loading }) => {
        this.loading = loading; //hide progress
        this.product$ = data.allProductslist.allProductparents.edges;
     });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
