import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {
  CartService
} from '@/core/service';

@Component({
  selector: 'app-cart-amount',
  templateUrl: './cart-amount.component.html',
  styleUrls: ['./cart-amount.component.scss']
})
export class CartAmountComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  totalAmount: number = 0;

  constructor(
    private cartService: CartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subscription = this.cartService.totalAmount$.subscribe(
      res => this.totalAmount = res
    )
  }

  goCheckout() {
    this.router.navigate([{ outlets: {primary: 'checkout', amount: null }}])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
