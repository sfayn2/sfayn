import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { shopcartInfo } from '../fragments';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const GET_SHOP_CART = gql`
    query ShopCartPerUser($uid: ID!) {
      allShoppingCart(user_Id: $uid ){
            ...shopcartInfo
      }
    }
    ${shopcartInfo}
`


const GET_NAV = gql`
    fragment myNav on Nav {
          arrow_back
          side_bar
          menu
          component
    }

`;

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
        let res1 = data.allShoppingCart.edges;

        // patch to add checked variable
        for (let itemCount in res1) {
            console.log(res1[itemCount].node);    
            res1[itemCount].node = Object.assign({"checked": false}, res1[itemCount].node);
        }
    
        this.cart$ = res1;
     })



     this._productService.shopcartTotalAmount = 0.0; // dont know how to share this in aux component?
  
  }


  shopNow(){
      
      
               console.log("Nung nangyayari?1111")
               this.cart1$ = this.apollo.getClient().readFragment({
                        //id: `allShoppingCart({"user_Id":1})`,
                        id: `$ROOT_QUERY.allShoppingCart({"user_Id":1})`,
                        fragment: gql`
                         fragment cartSelected2 on ShoppingCartNodeConnection  {
                             edges {
                                 node {
                                     id
                                     quantity
                                     __typename
                                 }
                             }
                         }
                        `
                    })

               this.apollo.getClient().readFragment({
                        //id: `allShoppingCart({"user_Id":1})`,
                        id: `$ROOT_QUERY.allShoppingCart({"user_Id":1})`,
                        fragment: gql`
                         fragment shopCart on ShoppingCartNode  {
                                     id
                                     quantity
                                     __typename
                         }
                        `
                    })

               this.apollo.getClient().writeFragment({
                        //id: `allShoppingCart({"user_Id":1})`,
                        id: `$ROOT_QUERY.allShoppingCart({"user_Id":1})`,
                        fragment: gql`
                         fragment shopCart on ShoppingCartNode  {
                                selected 
                         }
                        `,
                        data: { selected: false, __typename: "ShoppingCartNode" }
                    })

               console.log('Read fragment ShoppingCartNode', this.cart1$)
               console.log("Nung nangyayari?")
      
      
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
