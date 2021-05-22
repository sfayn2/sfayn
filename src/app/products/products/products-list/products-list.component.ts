import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GET_NAV, GET_PRODUCT_LIST } from '../../../@core/graphql/fragments';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  subscription: Subscription;
  product$: any ;
  loading: boolean = true;
 
  constructor(private apollo: Apollo) {

    apollo.client.writeFragment({
        id: 'Nav:1',
        fragment: GET_NAV,
        data: { 
        side_bar: true,
        menu: true,
        arrow_back: false,
        component: 'ProductsListComponent',
        __typename: 'Nav'
      }, 
    })

 }

  ngOnInit(): void {
  
    this.getProducts();

  }

  getProducts() {

    this.subscription = this.apollo.watchQuery<any>({
      query: GET_PRODUCT_LIST
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
      this.loading = loading; //hide progress
      this.product$ = data.allProductparents.edges.map(res => res.node.parent2product.edges).filter(res => res.length != 0)
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
