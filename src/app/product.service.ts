import { Injectable } from '@angular/core';
//import { BehaviorSubject, Observable } from 'rxjs';
//import { Apollo } from 'apollo-angular';
//import { map, tap } from 'rxjs/operators';

//import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

//sharedProdObjSrc$ = new BehaviorSubject(null);
  //sharedProdObj$ = this.sharedProdObjSrc$.asObservable();

  //constructor(private apollo: Apollo) { }
  constructor() { }

  //  getProd(): Observable<any> {
  //   
  //    return this.apollo.watchQuery<any>({
  //        query: gql`
  //                {
  //                    allProducts {
  //                            sku
  //                            title
  //                            color
  //                            size
  //                          }
  //                }
  //
  //      `
  //    })
  //      .valueChanges
  //      .pipe(
  //            map(res => res.data.allProducts)
  //       );
  //
  //       }
  //

}
