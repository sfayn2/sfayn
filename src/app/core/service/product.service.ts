import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { 
  GET_ALL_PRODUCTS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_CATEGORY,
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
      return this.apollo.watchQuery<any>({
        query: GET_ALL_PRODUCTS,
        variables: { keyword },
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
      return this.apollo.client.readFragment({
        id: `ProductVariantItemNode:${id}`,
        fragment: GET_PRODUCT_DETAIL,
        //What is the proper way to use multiple fragments in a readFragment https://github.com/apollographql/apollo-client/issues/2902
        fragmentName: "ProductVariantItemDetail", 
      });
    }

    allProductCategoryQuery(level) {
      return this.apollo.watchQuery<any>({
        query: GET_PRODUCT_CATEGORY,
        variables: { level },
      })
    }

}
