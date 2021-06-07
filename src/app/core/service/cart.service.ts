import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { 
  ADD_CART,
  UPDATE_CART,
  DELETE_CART,
  GET_ALL_CARTS,
  GET_ALL_CARTS_BY_WAREHOUSE
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  objSrc$ = new BehaviorSubject({
    cartObj: null,
    totalAmount: 0,
    typeNameId: []
  });

  obj$ = this.objSrc$.asObservable();

  constructor(
    private apollo: Apollo
  ) { }

  allCartsByWarehouseQuery() { 
    return this.apollo.watchQuery<any>({
      query: GET_ALL_CARTS_BY_WAREHOUSE,
      variables: { 
        uid: 1 
      }
     })
  }

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
      mutation: UPDATE_CART,
      variables: { user: 1, sku: sku, qty: val, mode: 1},
      }).subscribe()
  }

  deleteCart(user, sku) {
    // need to refetch query after mutation. not smart enough
    this.apollo.mutate({
      mutation: DELETE_CART,
      variables: { 
        user,
        sku,
      },
      refetchQueries: [{
        query: GET_ALL_CARTS,
        variables: { 
          uid: user
        }
      }]
    }).subscribe(res => console.log('delete cart', res) )
  }

  addCart(user, sku, qty) {
    // need to refetch query after mutation. not smart enough
    this.apollo.mutate({
      mutation: ADD_CART,
      variables: { user, sku, qty },
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
