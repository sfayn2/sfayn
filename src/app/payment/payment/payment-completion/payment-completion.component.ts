import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-payment-completion',
  templateUrl: './payment-completion.component.html',
  styleUrls: ['./payment-completion.component.scss']
})
export class PaymentCompletionComponent implements OnInit {

  @Input('amount')
  totalPayment: number = 0;

  @Input('order')
  orderId: string;


  constructor(
  ) { }

  ngOnInit(): void {
  }

}
