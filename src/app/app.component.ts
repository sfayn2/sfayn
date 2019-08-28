import { Component  } from '@angular/core';
import { Location } from '@angular/common';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { PRODUCTS_QUERY } from './fragments';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'sfayn';
  opened: boolean = true;
  menu = {};
  private _subscription: Subscription;
  constructor(private authService: AuthService,
              private productService: ProductService,
              private _location: Location) {


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

