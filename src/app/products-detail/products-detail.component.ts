import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { MenuService } from '../menu.service';

import { ActivatedRoute } from '@angular/router';

import gql from 'graphql-tag';

const prodsQuery = gql`
query SelectedProduct($id: ID!) {
  product (id: $id) {
    sku
    title
    color
    size
    goodsDesc
    parentSn {
      parent2product {
        edges {
          node {
            id
            size
            color
          }
        }
      }
    }
    warehouse {
      edges {
        node {
          warehouse
          goodsState
          price
          goodsNumber
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
     originalImg {
      edges {
        node {
          originalImg
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
  main_pic: string;

  private qrySubscription: Subscription;
  constructor(private apollo: Apollo,
              private route: ActivatedRoute,
              private ms: MenuService
              ) { }
 
  ngOnInit() {
       
        this.route.params.subscribe(routeParams => {
            this.main_pic = null; //reset every call
	    this.loadProductDetail(routeParams.id);
	});
        
        this.ms.sharedMenuSrc$.next({"menu": false, 
                                        "arrow_back": true });
   
    }

   loadProductDetail(id) {
        this.qrySubscription = this.apollo.watchQuery<any>({ query: prodsQuery, 
            variables: { "id": id }  })
         .valueChanges
         .subscribe(res => this.prod$ = res.data.product);
   }

  ngOnDestroy() {
    this.qrySubscription.unsubscribe();
  }


    setMainPic(x) {
        this.main_pic = x;
    }  


    isProdColor(c1, c2) {
        if (c1 == c2) { 
            return true;
        } else {
            return false;    
        }
    }


}
