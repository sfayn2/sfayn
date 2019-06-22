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

  prod$: any;
  private subscribe1: Subscription;
 
  constructor(private ps: ProductService,
              private _parent: AppComponent) { }

  ngOnInit() {

        let qry = {
            query: PRODUCTS_QUERY
        };
        this.subscribe1 = this.ps.getProd(qry).subscribe(res => this.ps.sharedProdObjSrc$.next(res.filter( r => r.length > 0)));
      
  }


  ngAfterViewInit() {
        // to avoid Expression has changed after it was checked when parent variable is sta]able
        // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
        Promise.resolve(null).then(() => this._parent.menu = {"menu": true, "arrow_back": false} );
  }

        
  ngOnDestroy() {
     this.subscribe1.unsubscribe();
  }


}
