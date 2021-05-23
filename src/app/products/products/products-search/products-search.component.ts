import { Component, OnInit } from '@angular/core';
import { ProductService } from '@/core/service';
import { Subscription } from 'rxjs';
//import { PRODUCTS_SEARCH_CATEGORY_QUERY } from '@core/graphql';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.scss']
})
export class ProductsSearchComponent implements OnInit {

  listOfCategoryCount: any[] = [];
  private _subscription1: Subscription;
  private _subscription2: Subscription;

  constructor(){}

  ngOnInit(): void {
  }

  searchCategory(id: number, catName: string) {
 ////   let qry = {
  //      query: PRODUCTS_SEARCH_CATEGORY_QUERY,
    //    variables: { "catId" : id }
    //};
//        this._subscription1 = this.productService.getProd(qry).subscribe(res => this.productService.sharedProdObjSrc$.next(res.filter(r=>r.length>0)));
}

  ngOnDestroy() {
    this._subscription1.unsubscribe();
    this._subscription2.unsubscribe();
  }

}
