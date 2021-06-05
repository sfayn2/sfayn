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
  product$: any ;
  loading: boolean = true;
 
  constructor(
    private productService: ProductService,
    private siteService: SiteService,
  ) {}

  ngOnInit(): void {
    this.siteService.setNav();
    this.subscription = this.productService.getProducts()
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading; //hide progress
        this.product$ = data.allProductparents.edges.map(res => res.node.parent2product.edges).filter(res => res.length != 0)
      });
      
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
