import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SiteService,
  ProductService,
  CartService,
  AuthService
} from '@/core/service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  product: any;
  mainPicture: string;
  selectVariant: Boolean = false;
  quantity: number = 1; //default

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private siteService: SiteService,
    private productService: ProductService,
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.siteService.setNav2({
      component: 'ProductDetailComponent',
    })

    //this.mainPicture = null;

    this.route.params.subscribe(routeParams => {
      this.product = this.productService.getProductDetail(routeParams.id);
    });
  }

  setMainPicture(img) {
    this.mainPicture = img;
  }  

  addCart(sku, qty) {
    if(!this.authService.isLoggedIn()) {
      this.authService.openLoginDialog();
    } else {
      // need to refetch query after mutation. not smart enough
      this.cartService.addCart(sku, qty).subscribe();
    }
  }

  goSelectVariant(id, img) {
    this.router.navigate(
      [{ outlets: {primary: `product/detail/${id}`, amount: null }}]
    )
    this.mainPicture = img; // change main pic display
    this.selectVariant = true;
  }


}
