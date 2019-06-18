import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { MenuService } from '../menu.service';
import { Subscription } from 'rxjs';
import { QUERY_PRODUCTS, QUERY_ALL_PRODUCTS } from '../fragments';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prod$: any;
  private subscribe1: Subscription;
  private subscribe2: Subscription;
 
  constructor(private ps: ProductService, private ms: MenuService) { }

  ngOnInit() {
    let qry = {
        query: QUERY_ALL_PRODUCTS
    };
     this.subscribe1 = this.ps.getProd(qry).subscribe(res => this.ps.sharedProdObjSrc$.next(res));
     this.subscribe2 = this.ps.sharedProdObj$.subscribe(res =>  this.prod$ = res);
     this.ms.sharedMenuSrc$.next({"menu": true, 
     "arrow_back": false });
  }
        
  ngOnDestroy() {
     this.subscribe1.unsubscribe();
     this.subscribe2.unsubscribe();
  }


}
