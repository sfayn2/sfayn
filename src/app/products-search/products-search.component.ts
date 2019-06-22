
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

  aCat1: any; // all category level1
  aCat2: any;
  aCat3: any;
  sCat: string; // selected category
  private subscribe1: Subscription;
  private subscribe2: Subscription;


  constructor(private ps: ProductService) {}

  ngOnInit() {
    this.subscribe1 = this.ps.getCat().subscribe(res => {
            console.log(res.level1.edges);
            this.aCat1 = res.level1.edges;
            this.aCat2 = res.level2.edges;
            this.aCat3 = res.level3.edges;
        });
  }

  searchCategory(id: number) {
    //console.log(this.aCat2);
    //console.log(this.aCat2.map(res => res.node).filter(res => res.parentId == id))
    //console.log(this.aCat2.map(res => res.node).filter(res => res.parentId == id).map(res => res.catId))
    let catId2 = this.aCat2.map(res => res.node).filter(res => res.parentId == id).map(res => res.catId)
    let catId3 = [];
    for (let x of catId2) {
        //console.log(this.aCat3.map(res => res.node).filter(res => res.parentId == x).map(res => res.catId))
        catId3.push(...this.aCat3.map(res => res.node).filter(res => res.parentId == x).map(res => res.catId))
    }
    console.log(catId3.join());
        let qry = {
            query: PRODUCTS_SEARCH_CATEGORY_QUERY,
            variables: { "catId" : catId3.join() }
        };
        this.subscribe2 = this.ps.getProd(qry).subscribe(res => this.ps.sharedProdObjSrc$.next(res.filter(r=>r.length>0)));
  }

  ngOnDestroy() {
     this.subscribe1.unsubscribe();
     this.subscribe2.unsubscribe();
  }

}
