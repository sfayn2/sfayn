import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import { GET_ALL_PRODUCTS } from '../graphql/fragments';

@Injectable({
  providedIn: 'root'
})

export class ProductsGQLService extends Query<any> {
    document = GET_ALL_PRODUCTS;
}
