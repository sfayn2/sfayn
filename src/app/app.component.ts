import { Component } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sfayn';
  opened: boolean = false;
  showLoading = true;
  menu = {};
  constructor(private _router: Router) { 
    this._router.events.subscribe((routerEvent: Event) => {
        if (routerEvent instanceof NavigationStart) {
            this.showLoading = true;
        }            
        if (routerEvent instanceof NavigationEnd) {
            setTimeout( ()=>{
                this.showLoading = false;
            }, 500)
        }            
        //        this.menu = {"menu": true, "arrow_back": false};

    })
  }
}
