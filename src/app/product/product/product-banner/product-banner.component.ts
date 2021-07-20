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

  getDisplayBanner() { //@Todo should be based on display order?
    let imgUpload = this.promotionalBanner.map( 
      res => res.node.imgUpload
    ).filter( res => res.length);

    let imgUrl = this.promotionalBanner.map( 
      res => res.node.imgUrl
    ).filter( res => res.length);

    if (imgUpload.length) {
      return imgUpload[0];
    } else if(imgUrl.length) {
      return imgUrl[0];
    }

    return null; // @Todo default img??
  }


  setBanner(img) {
    this.displayBanner = img;
  }

}
