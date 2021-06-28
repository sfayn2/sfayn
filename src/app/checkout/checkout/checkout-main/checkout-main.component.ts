import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CustomerService,
  PaymentService
} from '@/core/service';

@Component({
  selector: 'app-checkout-main',
  templateUrl: './checkout-main.component.html',
  styleUrls: ['./checkout-main.component.scss']
})
export class CheckoutMainComponent implements OnInit {

  loading: boolean = false;
  subscriptions = new Subscription();

  constructor(
    private customerService: CustomerService,
    private paymentService: PaymentService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.loadCustomerAddress());
    this.subscriptions.add(this.loadPaymentMethod());
  }

  loadCustomerAddress() {
    this.customerService.allCustomerAddressQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;

        //selected address
        const selected = data.allCustomeraddress.edges.map(
          res => res.node
        ).filter(
          res => res.default
        );

        this.customerService.objSrc$.next({ 
          ...this.customerService.objSrc$.getValue(), 
          obj: data.allCustomeraddress.edges,
          selected
        })

      });
  }

  loadPaymentMethod() {
    this.paymentService.allPaymentMethodQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;

        //selected payment
        const selected = data.allPaymentMethod.edges.map(
          res => res.node
        ).filter(
          res => res.default
        );

        this.paymentService.objSrc$.next({ 
          ...this.paymentService.objSrc$.getValue(), 
          obj: data.allPaymentMethod.edges,
          selected
        })

      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
