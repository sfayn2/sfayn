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
  loading: boolean = true;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.subscription = this.productService.obj$.subscribe(res => {
      this.productList = res.obj?.filter(res => res.node.default);
      this.loading = res.loading;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
