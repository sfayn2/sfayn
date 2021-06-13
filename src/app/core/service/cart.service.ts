import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { 
  ADD_CART,
  UPDATE_CART,
  DELETE_CART,
  GET_ALL_CARTS,
  GET_ALL_CARTS_BY_WAREHOUSE,
  GET_ALL_CARTS2
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
      query: GET_ALL_CARTS2,
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
    // no need to call cache.evict? it can auto trigger watchQuery
    this.apollo.mutate({
      mutation: UPDATE_CART,
      variables: { user: 1, sku: sku, qty: val, mode: 1},
      }).subscribe()
  }

  //cacheEvict(res) {
  //  const data = res.data['shoppingCart'].shoppingCart;
  //  console.log(data, 'delete?')
  //  const id = `${data.__typename}:${data.id}`; 
  //  console.log(id)
  //  this.apollo.client.cache.evict({id: 'allShoppingCartWarehouse' });
  //  this.apollo.client.cache.gc();
  //}

  deleteCart(user, sku) {
    // either use refetchQueries or cache.evict will do
    // and auto trigger watchQuery
    this.apollo.mutate({
      mutation: DELETE_CART,
      variables: { 
        user,
        sku,
      },
      refetchQueries: [
        { query: GET_ALL_CARTS, variables: { uid: user } },
        { query: GET_ALL_CARTS_BY_WAREHOUSE, variables: {  uid: user } }]
    }).subscribe()
  }

  addCart(user, sku, qty) {
    // why not evict instead of refetchQueries for new record? 
    this.apollo.mutate({
      mutation: ADD_CART,
      variables: { user, sku, qty },
      refetchQueries: [
        { query: GET_ALL_CARTS, variables: { uid: user } },
        { query: GET_ALL_CARTS_BY_WAREHOUSE, variables: {  uid: user } }]
    }).subscribe()
  }

  
}
