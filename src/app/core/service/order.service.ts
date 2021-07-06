import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { 
  GET_ORDER,
  CREATE_ORDER,
  UPDATE_ORDER,
  CREATE_ORDER_ITEM,
  GET_ALL_CARTS
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(
    private apollo: Apollo
  ) { }

  createOrder(totalAmount, payment, customerAddress) {
    const user = 'VXNlck5vZGU6MQ=='; //@Todo
    return this.apollo.mutate({
      mutation: CREATE_ORDER,
      variables: { user, totalAmount, payment, customerAddress },
      })
  }

  createOrderItem(order, item) {
    const user = 'VXNlck5vZGU6MQ=='; //@Todo
    this.apollo.mutate({
      mutation: CREATE_ORDER_ITEM,
      variables: { user, order, item },
      }).subscribe()
  }

  getOrderQuery(id) { 
    return this.apollo.watchQuery<any>({
      query: GET_ORDER,
      variables: { 
        id
      }
     })
  }

  paid(order) {
    const status = 1; //@Todo PAID lets use enum
    const user = 'VXNlck5vZGU6MQ=='; //@Todo 
    this.apollo.mutate({
      mutation: UPDATE_ORDER,
      variables: { order, status },
      refetchQueries: [
        { query: GET_ALL_CARTS, variables: { id: user } } 
      ]
      }).subscribe()
  }

}
