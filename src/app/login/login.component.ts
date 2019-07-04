import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    })

    hide: boolean = true;

    private _subscription: Subscription;

    constructor(public dialogRef: MatDialogRef<LoginComponent>,
                private authService: AuthService,
                private _snackBar: MatSnackBar,
                private fb: FormBuilder) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  logIn() {
    this._subscription = this.authService.login(this.loginForm.value.username, this.loginForm.value.password)
            .subscribe(res => {
                console.log(res.data.tokenAuth)
                localStorage.setItem("tokenAuth", res.data.tokenAuth.token)
                localStorage.setItem("currentUser", this.loginForm.value.username)
                this.dialogRef.close();
                this.alerts("Successfully login!", "Login");
            }, (err) => {
                localStorage.removeItem("tokenAuth")
                localStorage.removeItem("currentUser")
                this.alerts("Please, enter valid credentials!", "Login");
            }
    );
  }

  alerts(msg: string, action: string) {
    this._snackBar.open(msg, action, {
        duration: 2000,
    });
  }

  ngOnDestroy() {
    if (this._subscription) {
        this._subscription.unsubscribe();
    }
  }




}
