import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';
import { ProductsGQLService } from '@/core/service';
import {
  WRITE_NAV
} from '@/core/graphql';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent implements OnInit {
  title = 'sfayn';
  opened: boolean = true;
  //menu = {};
  menu$: any;
  loading: boolean = true;
  cartCount: number = 0 ;

  constructor(private productsGQLService: ProductsGQLService,
    private _location: Location,
    private apollo: Apollo) {

  }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: WRITE_NAV,
      variables: {
        id: 1
      }
    })
      .valueChanges
      .pipe(map(res => res.data.Nav ),
      ).subscribe(res => this.menu$ = res );

    this.productsGQLService.watch()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        console.log('loaded products', data)
    });

    this.apollo.watchQuery<any>({
      query: gql`
        query ShopCartPerUserResolver($uid: ID!) {
        allShoppingCart(user_Id: $uid ){
          edges {
            node {
              totalCount
            }
          }
        }
        }`,  
      variables: { 
        uid: 1 
      }
    })
    .valueChanges
    .subscribe( ({data, loading}) => {
        console.log('watching total Count?', data.allShoppingCart.edges.map(r => r.node.totalCount )[0])
        this.cartCount = data.allShoppingCart.edges.map(r => r.node.totalCount )[0]
      })
  }


}
