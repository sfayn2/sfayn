import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';
import { map } from 'rxjs/operators';
import {
  SiteService,
  ProductService,
  CartService,
} from '@/core/service';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss']
})
export class LayoutMainComponent implements OnInit, OnDestroy {
  title = 'sfayn';
  opened: boolean = true;
  menu$: any;
  loading: boolean = true;
  cartCount: number = 0 ;
  cartObj: any;
  subscriptions = new Subscription();

  constructor(
    private siteService: SiteService,
    private productService: ProductService,
    private cartService: CartService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.loadNav());
    this.subscriptions.add(this.loadProducts());
  }

  loadNav() {
    this.siteService.navQuery()
      .valueChanges
      .pipe(map(res => res.data.Nav ))
      .subscribe(res => this.menu$ = res)
  }

  loadProducts() {
    this.productService.allProductsQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.subscriptions.add(this.loadCarts())
    });
  }


  loadCarts() {
    this.cartService.allCartsQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        const data2 = data.allShoppingCart.edges;
        const totalAmount = this.cartService.getTotalAmount(data2)
        const typeNameId = this.cartService.getTypeNameId(data2)

        this.cartService.objSrc$.next({ 
          ...this.cartService.objSrc$.getValue(), 
          totalAmount,
          typeNameId
         } 
        )

        this.cartCount =  data2.length;
        console.log('cartObj', this.cartService.objSrc$.getValue(), this.cartCount)

        this.subscriptions.add(this.loadCartsByWarehouse())

    });
  }

  loadCartsByWarehouse() {
    this.cartService.allCartsByWarehouseQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        const cartObj = data.allShoppingCartWarehouse.map(r => r.warehouses)
        this.cartService.objSrc$.next({ 
          ...this.cartService.objSrc$.getValue(), 
          cartObj
         } 
        )
        this.loading = loading;
      })
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
