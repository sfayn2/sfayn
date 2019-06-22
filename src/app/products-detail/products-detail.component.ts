import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';

import { PRODUCTS_DETAIL_QUERY } from '../fragments';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit, AfterViewInit {

  prod$: any;
  main_pic: string;

  private qrySubscription: Subscription;
  constructor(private _apollo: Apollo,
              private _route: ActivatedRoute,
              private _parent: AppComponent
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
        Promise.resolve(null).then(() => this._parent.menu = {"menu": false, "arrow_back": true} );
    }

   loadProductDetail(id) {
        let qry = {
            query: PRODUCTS_DETAIL_QUERY,
            variables: { "id" : id }
        };
        this.qrySubscription = this._apollo.watchQuery<any>(qry).valueChanges.subscribe(res => this.prod$ = res.data.product);
   }

  ngOnDestroy() {
    this.qrySubscription.unsubscribe();
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


}
