import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import gql from 'graphql-tag';
import { 
  GET_RESOLVE_CART 
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private apollo: Apollo
  ) { }

  getResolveCart() { 
    return this.apollo.watchQuery<any>({
      query: GET_RESOLVE_CART,
      variables: { 
        uid: 1 
      }
     })
  }

  getTotalAmount(obj) {
    const totalAmount = obj.filter(res => res.node.checked == true)
      .map(res => res.node.totalPrice)
      .reduce((a, b) => a + b, 0.0);
    return totalAmount;
  }

  getTypeNameId(obj) {
    const typenameId = obj.map(res => res.node)
      .map(res => `${res.__typename}:${res.id}`)
    return typenameId
  }

  updateQuantity(sku, val) {
    this.apollo.mutate({
      mutation: gql`
        mutation ShopCartPerUser($user: ID!, $sku: ID!, $qty: ID!, $mode: ID!) {
          shoppingCart(user: $user, product: $sku, quantity: $qty, mode: $mode) {
            shoppingCart {
              id
              quantity
              totalPrice
             }
           }
         }
       `,
      variables: { user: 1, sku: sku, qty: val, mode: 1},
      }).subscribe()
  }
  
}
