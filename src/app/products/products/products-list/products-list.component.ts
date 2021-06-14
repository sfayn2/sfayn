import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  ProductService,
  SiteService,
} from '@/core/service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit, OnDestroy {
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
