import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { 
  GET_ALL_CUSTOMER_ADDRESS,
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  objSrc$ = new BehaviorSubject({
    obj: null,
  });

  obj$ = this.objSrc$.asObservable();

  constructor(
    private apollo: Apollo
  ) { }

  allCustomerAddressQuery() { 
    return this.apollo.watchQuery<any>({
      query: GET_ALL_CUSTOMER_ADDRESS,
      variables: { 
        id: 'VXNlck5vZGU6MQ==' 
      }
     })
  }

}
