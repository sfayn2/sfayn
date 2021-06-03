import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakevarService {

  totalAmountSrc$ = new BehaviorSubject(0.0);
  totalAmount$ = this.totalAmountSrc$.asObservable();

  constructor() { }
}
