import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

import { PRODUCTS_DETAIL_QUERY } from '../fragments';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit, AfterViewInit {

  prod$: any;
  main_pic: string;
  quantity: number = 1;

  private _subscription: Subscription;
  constructor(private _apollo: Apollo,
              private _route: ActivatedRoute,
              private _parent: AppComponent,
              private _productService: ProductService
              ) { }
 
  ngOnInit() {
        this._route.params.subscribe(routeParams => {
            this.main_pic = null; //reset every call
	    this.loadProductDetail(routeParams.id);
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

   loadProductDetail(id) {
        let qry = {
            query: PRODUCTS_DETAIL_QUERY,
            variables: { "id" : id }
        };
        this._subscription = this._apollo.watchQuery<any>(qry).valueChanges.subscribe(res => this.prod$ = res.data.product);
   }

  ngOnDestroy() {
    this._subscription.unsubscribe();
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
        this._subscription = this._productService.addCart(arg_user, arg_prod, arg_qty).subscribe(res => {
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
