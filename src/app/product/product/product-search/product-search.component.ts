import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {
  ProductService,
  SiteService
} from '@/core/service';

export interface Items {
  id: number;
  name: string;
  checked: boolean;
}

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  productList: any;
  categories: Items[];
  brands: Items[];
  loading: boolean = true;

  constructor(
    private productService: ProductService,
    private siteService: SiteService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {

    this.siteService.setNav2({
      component: 'ProductSearchComponent',
    })

    this.route.queryParams.subscribe(params => {
      this.loading = true;
      this.searchProduct(params.keyword);
    })

    // @Todo
    this.categories = [
      { id: 1, name: 'Writing Boards & Board', checked: false },
      { id: 2, name: 'Decoration', checked: false },
      { id: 3, name: 'Notebooks & Papers', checked: false },
      { id: 4, name: 'Writing & Connections', checked: false }
    ]

    // @Todo
    this.brands = [
      { id: 1, name: 'Brand A', checked: false },
      { id: 2, name: 'Brand B', checked: false },
      { id: 3, name: 'Brand C', checked: false },
    ]

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  searchProduct(keyword) {
    this.subscription = this.productService.searchProductsQuery(keyword)
      .valueChanges
      .pipe(delay(500))
      .subscribe(({data, loading}) => {
        this.productList = data.allProductparents.edges;
        this.loading = loading;
    });

  }

}
