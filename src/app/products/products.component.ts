import { Component, OnInit } from '@angular/core';
import { map, tap, switchMap } from 'rxjs/operators';

import { ProductService } from '../product.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';

const prodsQuery = gql`
        {
            allProducts {
                    sku
                    title
                    parentId
                    color
                    originalImg {
                        originalImg
                    }
                    warehouse {
                        warehouse
                        price
                        goodsState
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
         .valueChanges.subscribe(res => { 
            console.log(res.data.allProducts);
            this.prod$ = res.data.allProducts; 
            return this.prod$;
        });

        }

  ngOnDestroy() {
    this.qrySubscription.unsubscribe();
  }

}
