import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { 
  ADD_CART,
  UPDATE_CART,
  DELETE_CART,
  GET_ALL_CARTS,
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  objSrc$ = new BehaviorSubject({
    obj: null,
    totalAmount: 0,
    typeNameId: []
  });

  obj$ = this.objSrc$.asObservable();

  constructor(
    private apollo: Apollo
  ) { }

  allCartsQuery() { 
    return this.apollo.watchQuery<any>({
      query: GET_ALL_CARTS,
      variables: { 
        id: 'VXNlck5vZGU6MQ=='
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
      variables: { user: 'VXNlck5vZGU6MQ==', sku: sku, qty: val, mode: 1},
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

  deleteCart(sku) {
    // either use refetchQueries or cache.evict will do
    // and auto trigger watchQuery
    const user = 'VXNlck5vZGU6MQ=='; //@Todo it should use relay id?
    this.apollo.mutate({
      mutation: DELETE_CART,
      variables: { 
        user,
        sku,
      },
      refetchQueries: [
        { query: GET_ALL_CARTS, variables: { id: user } } 
      ]
    }).subscribe()
  }

  addCart(sku, qty)  {
    // why not evict instead of refetchQueries for new record? 
    const user = 'VXNlck5vZGU6MQ=='; //@Todo
    return this.apollo.mutate({
      mutation: ADD_CART,
      variables: { user, sku, qty },
      refetchQueries: [
        { query: GET_ALL_CARTS, variables: { id: user } } 
      ],
      errorPolicy: 'all' // @Todo how to set globally??
    })
  }

  
}
