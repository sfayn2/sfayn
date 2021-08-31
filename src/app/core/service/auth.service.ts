import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginComponent } from '../../login';
import { 
  VERIFY_TOKEN,
  TOKEN_AUTH,
  WRITE_AUTH
} from '@/core/graphql';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private dialog: MatDialog,
    private apollo: Apollo
  ) { }

  verifyToken(token) {
    return this.apollo.mutate({
      mutation: VERIFY_TOKEN,
      variables: {
        token
      }
    })
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
    });

    return dialogRef;

  }

  isLoggedIn() {
    let session = JSON.parse(localStorage.getItem('apollo-cache-persist'))
    if (session['Nav:1'].login) {
      return true;
    }
    return false;
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
  }

}
