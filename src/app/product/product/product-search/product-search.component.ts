import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
//import { delay, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
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
  keyword: string;

  minPrice: number;
  maxPrice: number;

  constructor(
    private productService: ProductService,
    private siteService: SiteService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {

    this.siteService.setNav2({
      component: 'ProductSearchComponent',
    })

    this.route.queryParams.subscribe(params => {
      this.loading = true;
      this.keyword = params.keyword;
      //this.minPrice = null;
      //this.maxPrice = null;
      this.searchProduct(params);
    })

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
      .subscribe(({data, loading}) => {
        this.productList = data.allProductparents.edges;
        console.log(data.allProductparents.edges)

        // get category parent ID
        const categoryIDs = this.productList.map(
          res => res.node.category.parent.id
        );
        this.getRelatedCategory(categoryIDs);

    });

  }

  getRelatedCategory(categoryIDs) {
    this.productService.getCategoryQuery(categoryIDs)
    .valueChanges
    .subscribe(({data, loading})=> {
      const relatedCategories = data.allProductcategory.edges.map(
          res => res.node.productcategorySet.edges.map(
            res2 => {
              return {
                id: res2.node.id,
                name: res2.node.name,
                checked: false
              }
            }
          )
      )
      this.categories = [];
      relatedCategories.forEach(res => {
        this.categories.push(...res)
      })
      this.loading = loading;
    })
  }

  filterByPrice() {
    // @Todo how product/search is hardcoded
    this.router.navigate(
      [{ outlets: {primary: 'product/search', amount: null }}],
      { 
        queryParams: { 
          keyword: this.keyword, 
          minprice: this.minPrice, 
          maxprice: this.maxPrice 
        }  
      }
    )
  }

}
