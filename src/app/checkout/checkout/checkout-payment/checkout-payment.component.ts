import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  PaymentService
} from '@/core/service';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.scss']
})
export class CheckoutPaymentComponent implements OnInit {

  loading: boolean = false;
  methodObj: any;
  subscriptions = new Subscription();

  constructor(
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.loadPaymentMethod());
  }

  loadPaymentMethod() {
    this.paymentService.allPaymentMethodQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.methodObj = data.allPaymentMethod.edges;
        console.log(data)
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
