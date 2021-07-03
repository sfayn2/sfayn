import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, fromEvent } from 'rxjs';
import { first } from 'rxjs/operators';
import { Apollo } from 'apollo-angular';

import { 
  GET_ALL_PAYMENT_METHOD,
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  objSrc$ = new BehaviorSubject({
    obj: null,
  });

  obj$ = this.objSrc$.asObservable();

  constructor(
    @Inject(DOCUMENT)
    private document: Document,
    private apollo: Apollo
  ) { }

  allPaymentMethodQuery() { 
    return this.apollo.watchQuery<any>({
      query: GET_ALL_PAYMENT_METHOD,
     })
  }

  public paypalInitiate(clientId: string): Observable<void> {
    const paypalScriptElement = this.document.createElement('script');

    paypalScriptElement.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
    paypalScriptElement.id = 'paypal-script';

    this.document.head.appendChild(paypalScriptElement);

    return fromEvent<void>(paypalScriptElement, 'load').pipe(first());
  }

  public paypalRemove(): void {
    const paypalScriptElement = this.document.getElementById('paypal-script');

    this.document.head.removeChild(paypalScriptElement);
  }

}
