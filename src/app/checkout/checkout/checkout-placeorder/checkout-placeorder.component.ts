import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  CartService,
  OrderService,
  CustomerService,
  PaymentService
} from '@/core/service';

declare var paypal; // js library in order to accept by typescript

@Component({
  selector: 'app-checkout-placeorder',
  templateUrl: './checkout-placeorder.component.html',
  styleUrls: ['./checkout-placeorder.component.scss']
})
export class CheckoutPlaceorderComponent implements OnInit, OnDestroy {

  @ViewChild('paypal', { static: true}) paypalElement: ElementRef;
  subscription = new Subscription();
  totalAmount: number = 0;
  customerAddressId: string;
  paymentMethodId: string;
  items: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private paymentService: PaymentService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    // get TotalAmount
    this.subscription.add(this.cartService.obj$.subscribe(
      res => {
        this.totalAmount = res.totalAmount;

        // get selected items
        this.items = res.obj.filter(
          res => res.node.checked
        ).map(res => res.node.id)

      }
    ));

    this.subscription.add(this.customerService.obj$.subscribe(
      res => {
        // get selected customer
        this.customerAddressId = res.obj?.filter(
          res => res.node.selected
        ).map(res => res.node.id)
      }
    ));

    this.subscription.add(this.paymentService.obj$.subscribe(
      res => {
        // get selected payment method
        this.paymentMethodId = res.obj?.filter(
          res => res.node.selected
        ).map(res => res.node.id)
      }
    ));
  }

  createOrder() {
    this.orderService.createOrder(
      this.totalAmount,
      this.paymentMethodId,
      this.customerAddressId
    ).subscribe(res => {
      
      this.items.forEach(item => {
        this.orderService.createOrderItem(
          res.data['shoporder'].shoporder.id,
          item
        )
      });
    
      this.goPayment(res.data['shoporder'].shoporder.id);

    });
  }

  goPayment(id) {
    this.router.navigate(['/payment', id]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
