import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { SHOPPING_CART_QUERY } from '../fragments';
import { Subscription } from 'rxjs';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit, AfterViewInit {

  shopCart$: any;
  private _subscription: Subscription;
  constructor(private _parent: AppComponent,
              private _productService: ProductService,
              ) { }



  ngOnInit() {
        let qry = {
            query: SHOPPING_CART_QUERY,
            variables: { "user" : 1 }
        };
        this._subscription = this._productService.getShopCart(qry).subscribe(res =>  { 
                
                    console.log(res);
                    this.shopCart$ = res;
                    return res;
            });
  
  }

  ngAfterViewInit() {
        // to avoid Expression has changed after it was checked when parent variable is sta]able
        // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
        Promise.resolve(null).then(() =>  { 
            this._parent.menu = {"menu": false, "arrow_back": true} 
            this._parent.opened = false; // hide sidebar
        });
  }


  ngOnDestroy() {
    this._subscription.unsubscribe();
  }


}
