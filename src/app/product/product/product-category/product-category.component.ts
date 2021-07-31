import { Component, OnInit } from '@angular/core';
import {
  ProductService
} from '@/core/service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  category: any;

  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.loadCategory("1"); // only Level 1
  }

  loadCategory(level) {
    this.productService.allCategoryQuery(level)
      .valueChanges
      .subscribe(({data, loading}) => {
        this.category = data.allProductcategory.edges.slice(0, 16);
        console.log(data.allProductcategory.edges)
    });
  }

}
