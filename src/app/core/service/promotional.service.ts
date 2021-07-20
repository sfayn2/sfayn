import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

import { 
  GET_ALL_BANNERS
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class PromotionalService {

  constructor(
    private apollo: Apollo
  ) { }

  getBannerQuery() { 
    const user = 'VXNlck5vZGU6MQ=='; //@Todo
    return this.apollo.watchQuery<any>({
      query: GET_ALL_BANNERS,
      variables: { 
        user
      }
     })
  }

}
