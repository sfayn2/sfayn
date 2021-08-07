import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { 
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  GET_ALL_CATEGORY,
} from '@/core/graphql';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  objSrc$ = new BehaviorSubject({
    obj: null,
  });

  obj$ = this.objSrc$.asObservable();

  constructor(private apollo: Apollo) { }

    allProductsQuery() {
      return this.apollo.watchQuery<any>({
        query: GET_ALL_PRODUCTS
      })
    }
    
    searchProductsQuery(keyword) {

      let variables = { 
        keyword,
        default: true // only show single variant in product list
      }

      if ("orderBy" in keyword) {
        variables["orderBy"] = keyword.orderBy; 
      }

      if ("minprice" in keyword) {
        variables["minprice"] = keyword.minprice; 
        variables["maxprice"] = keyword.maxprice; 
      }

      return this.apollo.watchQuery<any>({
        query: GET_ALL_PRODUCTS,
        variables: variables,
      })
    }

    //getProductDetail(id) {
    //  return this.apollo.client.readFragment({
    //    id: `ProductVariantNode:${id}`,
    //    fragment: GET_PRODUCT_DETAIL,
    //    //What is the proper way to use multiple fragments in a readFragment https://github.com/apollographql/apollo-client/issues/2902
    //    fragmentName: "ProductVariantDetail", 
    //  });
    //}

    getProductDetail(id) {
      return this.apollo.client.cache.readFragment({
        id: `ProductVariantItemNode:${id}`,
        fragment: GET_PRODUCT_DETAIL,
        //What is the proper way to use multiple fragments in a readFragment https://github.com/apollographql/apollo-client/issues/2902
        fragmentName: "ProductVariantItemDetail", 
      });
    }

    allCategoryQuery(level) {
      return this.apollo.watchQuery<any>({
        query: GET_ALL_CATEGORY,
        variables: { level },
      })
    }

    getCategoryQuery(id) {
      return this.apollo.watchQuery<any>({
        query: GET_ALL_CATEGORY,
        variables: { id },
      })
    }


}
