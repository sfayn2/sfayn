import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MakevarService {

  constructor() { }

  setSelectedValue(readField) {
    const typenameId = `${readField('__typename')}:${readField('id')}`;
    if (JSON.parse(localStorage.getItem(typenameId))) {
      return JSON.parse(localStorage.getItem(typenameId));
    } else if (readField('default')) {
      return true;
    } else {
      return false;
    }
  }
}
