import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  totalAmountSrc$ = new BehaviorSubject(false);
  totalAmount$ = this.totalAmountSrc$.asObservable();

  constructor() { }
  
}
