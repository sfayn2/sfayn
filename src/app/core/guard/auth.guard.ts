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
    private authService: AuthService
  ) {}
  //canActivate(
  //  next: ActivatedRouteSnapshot,
  //  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

  //  console.log('check localStorage', localStorage.getItem("currentUser"))
  //  
  //   if (localStorage.getItem("currentUser")) { // if login
  //          return true;
  //   }

  //  // if not login
  //  // https://stackoverflow.com/questions/48955831/angular-canactivate-with-login-dialog
  //  const dialogRef = this.dialog.open(LoginComponent, {
  //    width: '400px',
  //    height: '500px',
  //  });

  //  return dialogRef.afterClosed().toPromise().then(result =>{
  //     if (localStorage.getItem("currentUser")) {
  //         return true;
  //     } else {
  //         return false;
  //     }
  // });


  //}

  canLoad() { // @Todo require canActivate also

    if (localStorage.getItem("token")) {
      return true;
    }

    // if not login
    // https://stackoverflow.com/questions/48955831/angular-canactivate-with-login-dialog
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '350px',
      height: '400px',
    });

    return dialogRef.afterClosed().toPromise().then(result =>{
      if (localStorage.getItem("token")) {
        return true; // @Todo make sure to verify token?
      }
      return false;
    });

  }

  
}
