import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { 
  AuthService 
} from '@/core/service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(
    private authService: AuthService,
  ) {}

  loginRequired() {
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // if not login
    // https://stackoverflow.com/questions/48955831/angular-canactivate-with-login-dialog
    return this.authService.openLoginDialog().afterClosed().toPromise().then(({data}) =>{
      if (data == 'success') {
        return true; // @Todo make sure to verify token?
      }
      return false;
    });


  }

  canActivate() {
    return this.loginRequired();
  }

  canLoad() { // @Todo require canActivate also
    return this.loginRequired();
  }

  
}
