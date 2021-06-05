import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SiteService,
  ProductService,
  CartService
} from '@/core/service';

@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.scss']
})
export class ProductsDetailComponent implements OnInit {

  prod$: any;
  mainPicture: string;
  quantity: number = 1; //default

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.siteService.setNav2({
      component: 'ProductsDetailComponent',
    })
    this.route.params.subscribe(routeParams => {
      this.mainPicture = null; //reset every call
      this.prod$ = this.productService.getProductDetail(routeParams.id);
    });
  }

  setMainPicture(img) {
    this.mainPicture = img;
  }  

  isProdColor(c1, c2) {
    if (c1 == c2) { 
      return true;
    } else {
      return false;    
    }
  }

  addCart(user, sku, qty) {
    // need to refetch query after mutation. not smart enough
    this.cartService.addCart(user, sku, qty)
  }

}
