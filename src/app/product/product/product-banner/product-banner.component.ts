import { Component, OnInit } from '@angular/core';

import {
 PromotionalService
} from '@/core/service';

@Component({
  selector: 'app-product-banner',
  templateUrl: './product-banner.component.html',
  styleUrls: ['./product-banner.component.scss']
})
export class ProductBannerComponent implements OnInit {

  displayBanner: string;
  promotionalBanner: any;

  constructor(
    private promotionalService: PromotionalService
  ) { }

  ngOnInit(): void {
    this.promotionalService.getBannerQuery()
      .valueChanges
      .subscribe(({data, loading}) => {
        this.promotionalBanner = data.allPromotionalbanner.edges;
        this.displayBanner = this.getDisplayBanner();
        console.log('promotional', data.allPromotionalbanner.edges)
    })
  }

  getDisplayBanner() { 
    let imgUpload = this.promotionalBanner[0].node.imgUpload;
    let imgUrl = this.promotionalBanner[0].node.imgUrl;

    return imgUpload || imgUrl;
  }


  setBanner(img) {
    this.displayBanner = img;
  }

}
