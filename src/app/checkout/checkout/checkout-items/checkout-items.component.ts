import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CartService,
} from '@/core/service';

@Component({
  selector: 'app-checkout-items',
  templateUrl: './checkout-items.component.html',
  styleUrls: ['./checkout-items.component.scss']
})
export class CheckoutItemsComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  cartObj: any;

  constructor(
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.obj$.subscribe(res => {
      this.cartObj = res.cartObj;
      console.log('checkout-items', this.cartObj)
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
