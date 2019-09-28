import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { GET_NAV, GET_SHOP_CART, GET_SHOP_CART_ADD_CHECKED } from '../fragments';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit {

  selectedProducts: string[] = [];
  loading: boolean = true;
  cart$: any;
  cart1$: any;
  private subscription: Subscription;
  constructor(private _productService: ProductService,
              private apollo: Apollo
              ) {

        apollo.getClient().writeFragment({
            id: 'Nav:1',
            fragment: GET_NAV,
            data: { 
                side_bar: false,
                menu: false,
                arrow_back: true,
                component: 'ProductsCartComponent',
                __typename: 'Nav'
            }, 
        })

 }




  ngOnInit() {


     this.subscription = this.apollo.watchQuery({
          query: GET_SHOP_CART,
          variables: { 
            uid: 1 
          }
     })
     .valueChanges.subscribe( ({data, loading }) => { 
        this.loading = loading;
        
        // add checked field in cache
        this.apollo.getClient().query({
            query: GET_SHOP_CART_ADD_CHECKED
        }).then(res => this.cart$ = res.data.allShopCartAddChecked.allShoppingCart.edges)

     })


     this._productService.shopcartTotalAmount = 0.0; // dont know how to share this in aux component?
  
  }



  selectProduct(e, productSku, totalPrice) {

      if (e.checked) {
        this.selectedProducts.push(productSku);
        this._productService.shopcartTotalAmount += totalPrice;
      } else {
        this.selectedProducts = this.selectedProducts.filter(x => x != productSku);       
        this._productService.shopcartTotalAmount -= totalPrice;
       }
        console.log(e.checked, productSku, this.selectedProducts, this._productService.shopcartTotalAmount);
  }

  selectAll(e) {
      if (e.checked) {
        for (let sc of this.cart$) {
           this.selectedProducts.push(sc.node.product.sku);
           this._productService.shopcartTotalAmount += sc.node.totalPrice;
           sc.node.product.checked = e.checked;
        }
      } else {
          
            this.selectedProducts = [];
            this._productService.shopcartTotalAmount = 0.0;
            for (let sc of this.cart$) {
                sc.node.product.checked = e.checked;
            }
          
          }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
