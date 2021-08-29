import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../../login';
import { 
  AuthService 
} from '@/core/service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
  ) {}

  loginRequired() {
    let session = JSON.parse(localStorage.getItem('apollo-cache-persist'))

    if (session['Nav:1'].login) {
      return true;
    }

    // if not login
    // https://stackoverflow.com/questions/48955831/angular-canactivate-with-login-dialog
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    return dialogRef.afterClosed().toPromise().then(({data}) =>{
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
