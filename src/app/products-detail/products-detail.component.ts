import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { GET_NAV, GET_RESOLVE_CART, GET_PRODUCT_DETAIL } from '../fragments';



@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  prod$: any;
  main_pic: string;
  quantity: number = 1; //default

  constructor(private apollo: Apollo,
              private _route: ActivatedRoute,
              ) {

    apollo.getClient().writeFragment({
        id: 'Nav:1',
        fragment: GET_NAV,
        data: { 
        side_bar: false,
        menu: false,
        arrow_back: true,
        component: 'ProductsDetailComponent',
        __typename: 'Nav'
      }, 
    })
      
  }
 
  ngOnInit() {

        this._route.params.subscribe(routeParams => {
        this.main_pic = null; //reset every call
	      this.getProductDetail(routeParams.id);
	});
   
    }


  getProductDetail(id) {

    this.prod$ = this.apollo.getClient().readFragment({
      id: `ProductNode:${id}`,
      fragment: GET_PRODUCT_DETAIL,
      //What is the proper way to use multiple fragments in a readFragment https://github.com/apollographql/apollo-client/issues/2902
      fragmentName: "ProductDetail", 
    });

   console.log(this.prod$);

   }

    setMainPic(x) {
        this.main_pic = x;
    }  


    isProdColor(c1, c2) {
        if (c1 == c2) { 
            return true;
        } else {
            return false;    
        }
    }

    addCart(user, sku, qty) {

      console.log(user, sku, qty)

      this.apollo.mutate({
          mutation: gql`
            mutation addNewCart($user: ID!, $sku: ID!, $qty: ID!) {
              shoppingCart(user: $user, product: $sku, quantity: $qty, mode: 0) {
                shoppingCart {
                    dateCreated
                }
              }
            }
          `,
          variables: { user: user, sku: sku, qty: qty },
          refetchQueries: [{
            query: GET_RESOLVE_CART,
            variables: { 
              uid: user
            }
          }]
      }).subscribe(res => {
          console.log('new cart', res)
      })

    }

}
