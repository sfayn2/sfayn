import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
sharedMenuSrc$ = new BehaviorSubject({"menu": true, "arrow_back": false});
  sharedMenu$ = this.sharedMenuSrc$.asObservable();

  constructor() { 
  }
}
