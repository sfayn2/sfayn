import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

interface SortItems {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  results: number;
  sortItems: SortItems[] = [
    {value: 'price', viewValue: 'Price low to high'},
    {value: '-price', viewValue: 'Price high to low'},
  ];

  @Input() products: any;
  @Input() title: string;
  @Input() sort: boolean = false;
  @Output() sortEvent = new EventEmitter<string>();

  loading: boolean = true;
 
  constructor() {}

  ngOnInit(): void {
    this.results = this.products.length;
  }

  onSortChange(e) {
//    console.log(e)
    this.sortEvent.emit(e.value);
  }

}
