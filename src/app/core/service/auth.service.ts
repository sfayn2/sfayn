import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { 
  VERIFY_TOKEN,
  TOKEN_AUTH,
  WRITE_AUTH
} from '@/core/graphql';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  objSrc$ = new BehaviorSubject({
    obj: null,
    token: null,
    user: null
  });

  obj$ = this.objSrc$.asObservable();

  constructor(private apollo: Apollo) { }

  logout() {
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("currentUser");
  }

  verifyToken(token) {
    return this.apollo.mutate({
      mutation: VERIFY_TOKEN,
      variables: {
        token
      }
    })
  }

  authQuery() {
    return this.apollo.watchQuery<any>({
      query: WRITE_AUTH,
      variables: {
        id: 1
      }
    })
  }

  login(user, pass): Observable<any> {
    return this.apollo.mutate({
      mutation: TOKEN_AUTH,
      variables: {
        username: user,
        password: pass
      }
    })
        /*  .subscribe((res) => { 
            console.log(res) 
            this.authObjSrc$.next(res);
            return res;
        }, (err) => {
            console.log(`there was an error ${err}`)    
            this.authObjSrc$.next(err);
            return err;
        }  ); */

  }

}
