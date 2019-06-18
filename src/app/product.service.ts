import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map, tap, filter  } from 'rxjs/operators';

import { QUERY_CATEGORY, QUERY_PRODUCTS, QUERY_ALL_PRODUCTS } from './fragments';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

sharedProdObjSrc$ = new BehaviorSubject(null);
sharedProdObj$ = this.sharedProdObjSrc$.asObservable();


constructor(private apollo: Apollo) { }

//getProd(cat: string = "648,579,709,348,562,1919,1959"): Observable<any> {
    getProd(qry): Observable<any> {

        //        let qry = {
        //  query: QUERY_PRODUCTS,
        //  variables: { "catId": "648"}
        // };


        return this.apollo.watchQuery<any>(qry)
             .valueChanges
             .pipe(
                map(res => res.data.allProductparents.edges),
                map(res => res.map(r => r.node.parent2product.edges ) ),
                filter(res => res.length > 0)
              )
        };

    getCat(): Observable<any> {
        return this.apollo.watchQuery<any>({ query: QUERY_CATEGORY }).valueChanges
                 .pipe(
                    map(res => res.data ),
                    //  map(res => res.map(r => r.node.catName ) )
                    )
    }

}
