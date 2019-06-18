import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sfayn';
  opened: boolean = true;
  constructor(private ms: MenuService) { }
  //  ngOnInit() {
  // this.ms.sharedMenuSrc$.next({"menu": true, 
  // "arrow_back": false });
  //}
}
