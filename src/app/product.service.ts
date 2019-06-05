import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map, tap, filter  } from 'rxjs/operators';

import gql from 'graphql-tag';

const prodsQuery = gql`
query SearchProductByCategory($cat: String!) 
{
 allProductparents {
    edges {
      node {
        parent2product(first: 1, cat_CatName_Icontains: $cat) {
          edges {
            node {
              id
              sku
              title
              parentId
              color
              originalImg(first: 1) {
                edges {
                  node {
                    originalImg
                  }
                }
              }
              warehouse(first: 1) {
                edges {
                  node {
                    warehouse
                    price
                    goodsState
                    goodsNumber
                  }
                }
              }
            }
          }
        }
      }
    } 
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

sharedProdObjSrc$ = new BehaviorSubject(null);
sharedProdObj$ = this.sharedProdObjSrc$.asObservable();

constructor(private apollo: Apollo) { }

    getProd(): Observable<any> {

        return this.apollo.watchQuery<any>({ query: prodsQuery,
            variables: { "cat": "a"  }  })
             .valueChanges
             .pipe(
                map(res => res.data.allProductparents.edges),
                map(res => res.map(r => r.node.parent2product.edges ) ),
                filter(res => res.length > 0)
              )
        }

}
