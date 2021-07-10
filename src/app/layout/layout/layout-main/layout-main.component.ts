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
        console.log('layout-main', data);
        console.log(data.allProductparents.edges)
        this.productService.objSrc$.next({ 
          ...this.productService.objSrc$.getValue(), 
          obj: data.allProductparents.edges
         } 
        )
        this.subscriptions.add(this.loadCarts())
    });
  }


  loadCarts() {
    this.cartService.allCartsQuery()
      .valueChanges
      .subscribe(({data, loading}) => {

        // exclude those ordered products
        const obj = data.allShopcart.edges.filter(res => !res.node.cart2orderitem);

        const totalAmount = this.cartService.getTotalAmount(obj);
        const typeNameId = this.cartService.getTypeNameId(obj);

        this.cartService.objSrc$.next({ 
          ...this.cartService.objSrc$.getValue(), 
          obj,
          totalAmount,
          typeNameId
        })

        this.cartCount =  obj.length;
        this.loading = loading;

        //this.subscriptions.add(this.loadCartsByWarehouse())

    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
