import { Component, OnInit, Input } from '@angular/core';
import {
  SiteService,
} from '@/core/service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input()
  products: any;

  @Input()
  title: string;

  loading: boolean = true;
 
  constructor(
    private siteService: SiteService,
  ) {}

  ngOnInit(): void {
  }

}
