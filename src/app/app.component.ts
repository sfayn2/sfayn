import { Component, OnInit  } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { ProductService } from './product.service';
import { Subscription } from 'rxjs';
import { PRODUCTS_QUERY } from './fragments';

import { LoginComponent } from './login/login.component';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sfayn';
  opened: boolean = true;
  // showLoading = true;
  menu = {};
  private _subscription: Subscription;
  username: string;
  password: string;
  constructor(private _router: Router,
              private productService: ProductService,
              private dialog: MatDialog) { 


    //   this._router.events.subscribe((routerEvent: Event) => {
    //  if (routerEvent instanceof NavigationStart) {
    //       this.showLoading = true;
    //  }            
    //  if (routerEvent instanceof NavigationEnd) {
    //      setTimeout( ()=>{
    //          this.showLoading = false;
    //      }, 500)
    //  }            
        //        this.menu = {"menu": true, "arrow_back": false};

        // })
  }

  ngOnInit() {
    let qry = {
        query: PRODUCTS_QUERY
    };
    this._subscription = this.productService.getProd(qry).subscribe(res => this.productService.sharedProdObjSrc$.next(res.filter( r => r.length > 0)));

  
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '400px',
      height: '350px',
      data: {username: "", password: ""}
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(`The dialog was closed ${result.password}`);
    });
  }

}
