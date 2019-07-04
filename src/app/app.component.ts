import { Component, OnInit  } from '@angular/core';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';
import { PRODUCTS_QUERY } from './fragments';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'sfayn';
  opened: boolean = true;
  menu = {};
  private _subscription: Subscription;
  constructor(private authService: AuthService,
              private productService: ProductService,
              private _bottomSheet: MatBottomSheet) { 


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


  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetSubMenu);
  }



}


@Component({
  selector: 'bottom-sheet-submenu',
  template: `
        <mat-nav-list>
  <a mat-list-item (click)="openLink($event)">
    <mat-icon mat-list-icon>search</mat-icon>
    <span mat-line>Search</span>
  </a>

 <a mat-list-item (click)="loginDialog()">
    <mat-icon mat-list-icon>shopping_cart</mat-icon>
    <span mat-line>Checkout</span>
 </a>

 <ng-container *ngIf="authService.lStorage('currentUser')">
      <a mat-list-item (click)="authService.logout()">
        <mat-icon mat-list-icon>exit_to_app</mat-icon>
        <span mat-line>Logout</span>
      </a>
 </ng-container>

 <ng-container *ngIf="!authService.lStorage('currentUser')">
  <a mat-list-item (click)="openLink($event)">
    <mat-icon mat-list-icon>account_circle</mat-icon>
    <span mat-line>Signup</span>
  </a>
 </ng-container>
</mat-nav-list>
  `,
})

export class BottomSheetSubMenu {
        constructor(private authService: AuthService,
                    private _bottomSheetRef: MatBottomSheetRef<BottomSheetSubMenu>) {}

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
