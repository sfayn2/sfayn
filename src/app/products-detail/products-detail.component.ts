import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';

const prodsQuery = gql`
 {
  product (id: "UHJvZHVjdE5vZGU6MzExMDUwODAy") {
    sku
    title
    parentId
    color
    size
    goodsDesc
    warehouse {
      edges {
        node {
          warehouse
          goodsState
          price
        }
      }
    }
     descImg {
      edges {
        node {
          descImg
        }
      }
    }
  }
}
`;


@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  prod$: any;
  private qrySubscription: Subscription;
  constructor(private apollo: Apollo) { }
 
  ngOnInit() {
       
        //this.ps.getProd().subscribe(res => this.ps.sharedProdObjSrc$.next(res));
        //this.ps.sharedProdObj$.subscribe(res => this.prod$ = res);
     this.qrySubscription = this.apollo.watchQuery<any>({ query: prodsQuery  })
         .valueChanges
         .subscribe(res => this.prod$ = res.data.product);

        }

  ngOnDestroy() {
    this.qrySubscription.unsubscribe();
    }
}
