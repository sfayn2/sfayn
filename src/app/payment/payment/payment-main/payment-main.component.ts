import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import {
  OrderService,
} from '@/core/service';

@Component({
  selector: 'app-payment-main',
  templateUrl: './payment-main.component.html',
  styleUrls: ['./payment-main.component.scss']
})
export class PaymentMainComponent implements OnInit {

  subscription = new Subscription();
  totalPayment: number = 0;
  paymentStatus: string;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(routeParams => {
      this.subscription.add(
        this.getOrder(routeParams.id)
      )
    });
  }

  getOrder(id) {
    this.orderService.getOrderQuery(id)
      .valueChanges
      .subscribe(({data, loading}) => {
        data.allShoporder.edges.forEach(res => {
          console.log('getOrder', res.node)
          this.totalPayment = res.node.totalAmount;
          this.paymentStatus = res.node.status;
        })

    });
  }


}
