import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { environment } from '../../../../environments/environment'; // @Todo: to alias the dir. path
import {
  PaymentService
} from '@/core/service';

declare var paypal; // js library in order to accept by typescript

@Component({
  selector: 'app-checkout-paypal',
  templateUrl: './checkout-paypal.component.html',
  styleUrls: ['./checkout-paypal.component.scss']
})
export class CheckoutPaypalComponent implements OnInit, OnDestroy {

  subscriptions = new Subscription();
  @ViewChild('paypal', { static: true}) paypalElement: ElementRef;

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.subscriptions = this.paymentService.paypalInitiate(
      environment.paypalClientId
    ).subscribe(() => {
      this.genPayPalButtons();
    })
  }

  genPayPalButtons() {
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
                      value: '0.44'
                  }
              }],
              application_context: {  shipping_preference: 'NO_SHIPPING'   }
          });
      },

      onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            // Show a success message to the buyer
            console.log(details)
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
        });
      }

    }).render(this.paypalElement.nativeElement);

  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.paymentService.paypalRemove();
  }

}
