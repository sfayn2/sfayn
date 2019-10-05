import { Component, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { ProductService } from '../product.service';
import gql from 'graphql-tag';
import { GET_NAV, GET_PRODUCT_DETAIL } from '../fragments';



@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  prod$: any;
  main_pic: string;
  quantity: number = 1;

  products$: Observable<any>;

  private subscription: Subscription;
  constructor(private apollo: Apollo,
              private _route: ActivatedRoute,
              private _productService: ProductService
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

  ngOnDestroy() {
      if (this.subscription) {
         this.subscription.unsubscribe();
     }
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

    addCart(arg_user, arg_prod, arg_qty): void {
        this.subscription = this._productService.addCart(arg_user, arg_prod, arg_qty).subscribe(res => {
            console.log(res);     
        }, (err) => {
            console.log(arg_user, arg_prod, arg_qty);
            console.log(err);
        });
    }

    addQty() {
    if (this.quantity <= 10 ) { //add limit first
            this.quantity = this.quantity + 1;
        }
    }

    minusQty() {
        if (this.quantity > 1) {
            this.quantity = this.quantity - 1;
        }
    }


}
