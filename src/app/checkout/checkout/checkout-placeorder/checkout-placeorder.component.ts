import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CartService,
  OrderService,
  CustomerService,
  PaymentService
} from '@/core/service';

@Component({
  selector: 'app-checkout-placeorder',
  templateUrl: './checkout-placeorder.component.html',
  styleUrls: ['./checkout-placeorder.component.scss']
})
export class CheckoutPlaceorderComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  totalAmount: number = 0;
  customerAddressId: string;
  paymentMethodId: string;
  items: any;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    // get TotalAmount
    this.subscription.add(this.cartService.obj$.subscribe(
      res => {
        this.totalAmount = res.totalAmount;

        // get selected items
        this.items = res.cartObj.filter(
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

    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
