import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { VERIFY_TOKEN_MUTATION, TOKEN_AUTH_MUTATION } from './fragments'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authObjSrc$ = new BehaviorSubject(null);
  authObj$ = this.authObjSrc$.asObservable();

  constructor(private _apollo: Apollo) { }

  lStorage(key) {
    return localStorage.getItem(key);
  }

  logout() {
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("currentUser");
 }

  login(arg_user, arg_pass): Observable<any> {
    return this._apollo.mutate({
        mutation: TOKEN_AUTH_MUTATION,
        variables: {
            username: arg_user,
            password: arg_pass
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
