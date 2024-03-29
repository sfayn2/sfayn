import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '@/core/service';
import { Subscription } from 'rxjs';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DOCUMENT } from '@angular/common';
import {
  SiteService
} from '@/core/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  })

  hide: boolean = true;

  private subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    @Inject(DOCUMENT) private document: Document,
    private siteService: SiteService,
    private fb: UntypedFormBuilder) { 
    }

  ngOnInit() {

    // hide main scroll bar and use mat dialg back drop scroll bar
    this.document.documentElement.style.overflow = 'hidden'

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  logIn() {
    this.subscription = this.authService.login(
      this.loginForm.value.username, 
      this.loginForm.value.password
    ).subscribe(res => {

        //this.authService.objSrc$.next({
        //  ...this.authService.objSrc$.getValue(), 
        //  token: res.data.tokenAuth.token,
        //  user: this.loginForm.value.username
        //})

        this.siteService.setUserSession(
          true,
          this.loginForm.value.username,
          res.data.tokenAuth.token
        )

        this.dialogRef.close({ data: 'success' });
        this.alerts("Successfully login!", "Login");

    }, (err) => {
        this.siteService.setUserSession(
          false,
          'Anonymous',
          ''
        )
        this.alerts("Please, enter valid credentials!", "Login");
    }
    );
  }

  alerts(msg: string, action: string) {
    this.snackBar.open(msg, action, {
        duration: 2000,
    });
  }

  ngOnDestroy() {
    // display back original main page scroll bar
    this.document.documentElement.style.overflow = 'auto'

    if (this.subscription) {
        this.subscription.unsubscribe();
    }
  }




}
