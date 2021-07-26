import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ProductService
} from '@/core/service';

@Component({
  selector: 'app-product-main',
  templateUrl: './product-main.component.html',
  styleUrls: ['./product-main.component.scss']
})
export class ProductMainComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  productList: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.subscription = this.productService.obj$.subscribe(res => {
      this.productList = res.obj;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
