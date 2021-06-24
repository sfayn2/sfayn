import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  CustomerService
} from '@/core/service';

@Component({
  selector: 'app-checkout-address',
  templateUrl: './checkout-address.component.html',
  styleUrls: ['./checkout-address.component.scss']
})
export class CheckoutAddressComponent implements OnInit, OnDestroy {

  loading: boolean = false;
  addressObj: any;
  subscriptions = new Subscription();

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.subscriptions.add(this.loadCustomerAddress());
  }

  loadCustomerAddress() {
    this.customerService.allCustomerAddressQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.loading = loading;
        this.addressObj = data.allCustomeraddress.edges;
        console.log(data)
      });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
