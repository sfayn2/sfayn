import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { 
  GET_NAV, 
  WRITE_NAV
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class SiteService {
  constructor(private apollo: Apollo) { }

  navQuery() {
    return this.apollo.watchQuery<any>({
      query: WRITE_NAV,
      variables: {
        id: 1
      }
    })
  }

  setNav2({
    component = null,
  } = {} ) {

    this.setNav({
      side_bar: false,
      menu: false,
      arrow_back: true,
      component,
    });

  }

  setNav({ 
      side_bar = true, 
      menu = true, 
      arrow_back = false, 
      component = null,
      __typename = 'Nav'
   } = {}
  ) {

    this.apollo.client.writeFragment({
      id: 'Nav:1',
      fragment: GET_NAV,
      data: { 
          side_bar,
          menu,
          arrow_back,
          component,
          __typename }, 
      })
  }

}