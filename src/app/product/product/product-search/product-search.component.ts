import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ProductService
} from '@/core/service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  productList: any;

  constructor(
    private productService: ProductService
  ){}

  ngOnInit(): void {
    this.subscription = this.productService.obj$.subscribe(res => {
      this.productList = res.obj;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
