import { Component, OnInit } from '@angular/core';
import { map, tap, switchMap } from 'rxjs/operators';

import { ProductService } from '../product.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';


const prodsQuery = gql`
{
 allProductparents {
    edges {
      node {
        id
        parent2product(first: 1) {
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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  prod$: any;
  private qrySubscription: Subscription;
 
  constructor(private ps: ProductService, private apollo: Apollo) { }

  ngOnInit() {
       
        //this.ps.getProd().subscribe(res => this.ps.sharedProdObjSrc$.next(res));
        //this.ps.sharedProdObj$.subscribe(res => this.prod$ = res);
     this.qrySubscription = this.apollo.watchQuery<any>({ query: prodsQuery  })
         .valueChanges
          .pipe(
            map(res => res.data.allProductparents.edges.map(res1 => res1.node) )
          )
          .subscribe(res => { this.prod$ = res
                console.log(res);
          });
        }

  ngOnDestroy() {
    this.qrySubscription.unsubscribe();
  }

}
