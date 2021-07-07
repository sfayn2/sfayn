import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SiteService,
  ProductService,
  CartService
} from '@/core/service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any;
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
      component: 'ProductDetailComponent',
    })
    this.route.params.subscribe(routeParams => {
      this.mainPicture = null; //reset every call
      this.product = this.productService.getProductDetail(routeParams.id);
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

  addCart(sku, qty) {
    // need to refetch query after mutation. not smart enough
    this.cartService.addCart(sku, qty)
  }

}
