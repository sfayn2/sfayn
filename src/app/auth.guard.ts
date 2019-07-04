import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private dialog: MatDialog) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
     if (localStorage.getItem("currentUser")) { // if login
            return true;
     }

     // if not login
     // https://stackoverflow.com/questions/48955831/angular-canactivate-with-login-dialog
     const dialogRef = this.dialog.open(LoginComponent, {
       width: '400px',
       height: '500px',
     });

     return dialogRef.afterClosed().toPromise().then(result =>{
        if (localStorage.getItem("currentUser")) {
            return true;
        } else {
            return false;
        }
    });


  }

  
}
