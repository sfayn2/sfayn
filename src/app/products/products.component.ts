import { Component, OnInit } from '@angular/core';

import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prod$: any;
  private subscribe1: Subscription;
  private subscribe2: Subscription;
 
  constructor(private ps: ProductService) { }

  ngOnInit() {
     this.subscribe1 = this.ps.getProd().subscribe(res => this.ps.sharedProdObjSrc$.next(res));
     this.subscribe2 = this.ps.sharedProdObj$.subscribe(res =>  this.prod$ = res);
  }
        
  ngOnDestroy() {
     this.subscribe1.unsubscribe();
     this.subscribe2.unsubscribe();
  }

}
