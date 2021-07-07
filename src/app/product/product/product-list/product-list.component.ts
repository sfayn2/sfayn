import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ProductService,
  SiteService,
} from '@/core/service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  products: any ;
  loading: boolean = true;
 
  constructor(
    private productService: ProductService,
    private siteService: SiteService,
  ) {}

  ngOnInit(): void {
    this.siteService.setNav();
    this.subscription = this.productService.obj$.subscribe(res => {
      this.products = res.obj;
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
