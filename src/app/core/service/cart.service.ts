import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import gql from 'graphql-tag';
import { 
  GET_ALL_CARTS
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  objSrc$ = new BehaviorSubject(null);
  obj$ = this.objSrc$.asObservable();

  constructor(
    private apollo: Apollo
  ) { }

  allCartsQuery() { 
    return this.apollo.watchQuery<any>({
      query: GET_ALL_CARTS,
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

  addCart(user, sku, qty) {
    // need to refetch query after mutation. not smart enough
    this.apollo.mutate({
      mutation: gql`
        mutation addNewCart($user: ID!, $sku: ID!, $qty: ID!) {
          shoppingCart(user: $user, product: $sku, quantity: $qty, mode: 0) {
            shoppingCart {
                dateCreated
            }
          }
        }
      `,
      variables: { user: user, sku: sku, qty: qty },
      refetchQueries: [{
        query: GET_ALL_CARTS,
        variables: { 
          uid: user
        }
      }]
    }).subscribe(res => {
      console.log('new cart', res)
    })
  }

  
}
