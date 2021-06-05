import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map, tap, filter  } from 'rxjs/operators';

import { 
  PRODUCTS_SEARCH_CATEGORY_LIST_QUERY, 
  SHOPPING_CART_MUTATION,
  GET_PRODUCT_LIST,
  GET_ALL_PRODUCTS
} from '@/core/graphql';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

sharedProdObjSrc$ = new BehaviorSubject(null);
sharedProdObj$ = this.sharedProdObjSrc$.asObservable();


constructor(private apollo: Apollo) { }


    getCat(): Observable<any> {
        return this.apollo.query<any>({ query: PRODUCTS_SEARCH_CATEGORY_LIST_QUERY })
                 .pipe(
                    map(res => res.data ),
                    //  map(res => res.map(r => r.node.catName ) )
                    )
    };

    addCart(arg_user, arg_prod, arg_qty): Observable<any> {
        return this.apollo.mutate({
            mutation: SHOPPING_CART_MUTATION,
            variables: {
                user: arg_user,
                prod: arg_prod,
                qty: arg_qty
            }
            })
    
    };

    getProducts() {
      return this.apollo.watchQuery<any>({
        query: GET_PRODUCT_LIST
      })
    };

    allProductsQuery() {
      return this.apollo.watchQuery<any>({
        query: GET_ALL_PRODUCTS
      })
    }

}
