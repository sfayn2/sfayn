import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CartService
} from '@/core/service';

@Component({
  selector: 'app-checkout-placeorder',
  templateUrl: './checkout-placeorder.component.html',
  styleUrls: ['./checkout-placeorder.component.scss']
})
export class CheckoutPlaceorderComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.cartService.obj$.subscribe(
      res => this.totalAmount = res.totalAmount 
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
