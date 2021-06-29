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
        this.customerService.objSrc$.next({ 
          ...this.customerService.objSrc$.getValue(), 
          obj: data.allCustomeraddress.edges,
        })

      });
  }

  loadPaymentMethod() {
    this.paymentService.allPaymentMethodQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.paymentService.objSrc$.next({ 
          ...this.paymentService.objSrc$.getValue(), 
          obj: data.allPaymentMethod.edges,
        })

      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }


}
