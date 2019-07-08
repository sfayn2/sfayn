import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-cart',
  templateUrl: './products-cart.component.html',
  styleUrls: ['./products-cart.component.scss']
})
export class ProductsCartComponent implements OnInit, AfterViewInit {

  constructor(private _parent: AppComponent,
              private router: Router
                ) { }


  ngOnInit() {
  }

  ngAfterViewInit() {
        // to avoid Expression has changed after it was checked when parent variable is sta]able
        // https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
        Promise.resolve(null).then(() =>  { 
            this._parent.menu = {"menu": false, "arrow_back": true} 
            this._parent.opened = false; // hide sidebar
        });
    }

 goProdList(): void {
    this.router.navigate(["/pl"]);
 }

}
