import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { PRODUCTS_QUERY } from '../fragments';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  private _subscription: Subscription;
 
  constructor(private productService: ProductService,
              private _parent: AppComponent) { }

  ngOnInit() {

  //  if (!this.productService.sharedProdObjSrc$.value) { // execute only for the first time?
  //              let qry = {
  //                  query: PRODUCTS_QUERY
  //              };
  //              this._subscription = this.productService.getProd(qry).subscribe(res => this.productService.sharedProdObjSrc$.next(res.filter( r => r.length > 0)));

  //       }
  }


  ngAfterViewInit() {
        // to avoid Expression has changed after it was checked when parent variable is sta]able
        // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
        Promise.resolve(null).then(() => this._parent.menu = {"menu": true, "arrow_back": false} );
        this._parent.opened = true;
  }

        
  ngOnDestroy() {
    if (this._subscription) {
        this._subscription.unsubscribe();
    }
  }


}
