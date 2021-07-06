import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment'; // @Todo: to alias the dir. path
import {
  PaymentService,
  OrderService
} from '@/core/service';

declare var paypal; // js library in order to accept by typescript

@Component({
  selector: 'app-payment-paypal',
  templateUrl: './payment-paypal.component.html',
  styleUrls: ['./payment-paypal.component.scss']
})
export class PaymentPaypalComponent implements OnInit {

  subscriptions = new Subscription();
  @ViewChild('paypal', { static: true}) paypalElement: ElementRef;

  @Input('amount')
  totalPayment: number = 0;

  @Input('order')
  orderId: string;

  constructor(
    private paymentService: PaymentService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.subscriptions = this.paymentService.paypalInitiate(
      environment.paypalClientId
    ).subscribe(() => {
      this.genPayPalButtons(
        this.orderService,
        this.totalPayment,
        this.orderId
      );
    })
  }

  genPayPalButtons(orderService, totalPayment, orderId) {
    // paypal
    paypal.Buttons({
      style: {
        color:  'blue',
        shape:  'pill',
        label:  'pay',
        height: 40,
        width: 100
      },

      // Set up the transaction
      createOrder: function(data, actions) {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: totalPayment
            }
          }],
          application_context: {  shipping_preference: 'NO_SHIPPING'   }
        });
      },

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
          // Show a success message to the buyer
          console.log('paypal Orderid', orderId)
          orderService.paid(orderId);
          console.log(details)
          console.log('Transaction completed by ' + details.payer.name.given_name + '!');
        });
      }

    }).render(this.paypalElement.nativeElement);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.paymentService.paypalRemove();
  }

}
