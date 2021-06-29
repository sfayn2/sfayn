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
  subscription: Subscription;

  constructor(
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.subscription = this.customerService.obj$.subscribe(res => {
      this.addressObj = res.obj?.filter(
        res => res.node.selected
      ).map(
        res => res.node
      )
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
