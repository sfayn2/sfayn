import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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
    private apollo: Apollo
  ) { }

  allPaymentMethodQuery() { 
    return this.apollo.watchQuery<any>({
      query: GET_ALL_PAYMENT_METHOD,
     })
  }

}
