import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-cart-checkout',
  templateUrl: './products-cart-checkout.component.html',
  styleUrls: ['./products-cart-checkout.component.scss']
})
export class ProductsCartCheckoutComponent implements OnInit {

  constructor(private productService: ProductService) { }

  ngOnInit() {
  }


}
