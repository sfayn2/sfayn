
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { PRODUCTS_SEARCH_CATEGORY_QUERY } from '../fragments';


@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.css']
})
export class ProductsSearchComponent implements OnInit {

  sCat: string; // selected category
  listOfCategoryCount: any[] = [];
  private _subscribe1: Subscription;
  private _subscribe2: Subscription;


  constructor(private productService: ProductService) {}

  ngOnInit() {
    this._subscribe1 = this.productService.getCat().subscribe(res => {
            let categorySrc1 = res.level1.edges;
            let categorySrc2 = res.level2.edges;
            let categorySrc3 = res.level3.edges;
        
            for (let c of categorySrc1) {
                let listOfCategoryId2 = categorySrc2.map(res => res.node)
                                       .filter(res => res.parentId == c.node.catId)
                                       .map(res => res.catId)
                let listOfCategoryId3 = [];
                for (let catId2 of listOfCategoryId2) {
                        listOfCategoryId3.push(...categorySrc3.map(res => res.node)
                                                 .filter(res => res.parentId == catId2)
                                                 .map(res => res.catId)
                            )
                    }

                    let qry = {
                        query: PRODUCTS_SEARCH_CATEGORY_QUERY,
                        variables: { "catId" : listOfCategoryId3.join() }
                        };

                    this._subscribe2 = this.productService.getProd(qry).subscribe(res => {
                        let tmp = {};
                        tmp["catId"] = c.node.catId;
                        tmp["catName"] = c.node.catName;
                        tmp["catCount"] = res.filter(r => r.length > 0).length;
                        tmp["level3CatId"] = listOfCategoryId3.join();
                        return this.listOfCategoryCount.push(tmp);
                    });

             }

        });
  }


  searchCategory(id: number) {
        let qry = {
            query: PRODUCTS_SEARCH_CATEGORY_QUERY,
            variables: { "catId" : id }
        };
        this._subscribe2 = this.productService.getProd(qry).subscribe(res => this.productService.sharedProdObjSrc$.next(res.filter(r=>r.length>0)));
  }

  ngOnDestroy() {
     this._subscribe1.unsubscribe();
     this._subscribe2.unsubscribe();
  }

}
