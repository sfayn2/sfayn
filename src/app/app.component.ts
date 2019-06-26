import { Component, OnInit  } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { PRODUCTS_QUERY } from './fragments';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sfayn';
  opened: boolean = true;
  // showLoading = true;
  menu = {};
  private _subscription: Subscription;
  constructor(private _router: Router,
              private productService: ProductService) { 

    //   this._router.events.subscribe((routerEvent: Event) => {
    //  if (routerEvent instanceof NavigationStart) {
    //       this.showLoading = true;
    //  }            
    //  if (routerEvent instanceof NavigationEnd) {
    //      setTimeout( ()=>{
    //          this.showLoading = false;
    //      }, 500)
    //  }            
        //        this.menu = {"menu": true, "arrow_back": false};

        // })
  }

  ngOnInit() {
    let qry = {
        query: PRODUCTS_QUERY
    };
    this._subscription = this.productService.getProd(qry).subscribe(res => this.productService.sharedProdObjSrc$.next(res.filter( r => r.length > 0)));

  
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

}
