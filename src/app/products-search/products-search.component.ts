import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products-search',
  templateUrl: './products-search.component.html',
  styleUrls: ['./products-search.component.css']
})
export class ProductsSearchComponent implements OnInit {
  catLimit = 5;
  wareLimit = 5;
  searchForm: FormGroup;
  //productCategory = ["All Categories", "Tablets & Accessories"];
  productCategory = ["All Categories", "Tablets & Accessories", "Phones & Accessories", "Computer & Office", "Consumer Electronics", "Toys & Hobbies", "Home & Garden", "Sports & Entertainment", "Automobiles & Motorcycles", "Watches", "Lights & Lighting", "Women's Clothing", "Men's Clothing", "Bags", "Shoes", "Beauty & Health", "Mother & Kids", "Clothing Accessories", "Jewelry", "Original Design-Women's Clothing"];

  productWarehouse = ["CN-1", "US-1", "US-2", "ES-1", "US-3", "CN-8", "HK-4", "CN-5", "US-4", "RU-2", "UK-3", "FR-1", "AU-1", "CN-9", "CN-7"]


  constructor(private fb: FormBuilder) {
    // Create a FormControl for each available product category, initialize them as unchecked, and put them in an array
    const formControlsCategory = this.productCategory.map(control => new FormControl(false));
    const formControlsWarehouse = this.productWarehouse.map(control => new FormControl(false));
  
    // Simply add the list of FormControls to the FormGroup as a FormArray
    this.searchForm = this.fb.group({
      productCategory: new FormArray(formControlsCategory),
      productWarehouse: new FormArray(formControlsWarehouse),
    });
  }

  ngOnInit() {
    this.searchForm.valueChanges.subscribe(x => console.log(x))
  
  }

  submit() {
    // do something
  }

  moreCategory() {
    this.catLimit = this.productCategory.length;
    console.log(this.productCategory.length);
  }


}
