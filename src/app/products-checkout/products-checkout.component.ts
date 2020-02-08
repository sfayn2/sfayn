import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { GET_NAV } from '../fragments';
import { MatDialog } from '@angular/material/dialog';
import { ShippingAddressComponent } from '../shipping-address/shipping-address.component';

@Component({
  selector: 'app-products-checkout',
  templateUrl: './products-checkout.component.html',
  styleUrls: ['./products-checkout.component.scss']
})
export class ProductsCheckoutComponent implements OnInit {

  constructor(private apollo: Apollo,
              private dialog: MatDialog) { 

    apollo.getClient().writeFragment({
        id: 'Nav:1',
        fragment: GET_NAV,
        data: { 
        side_bar: false,
        menu: false,
        arrow_back: true,
        component: 'ProductsCheckoutComponent',
        __typename: 'Nav'
      }, 
    })

  }

  ngOnInit() {
  } 


  addAddress(): void {
    const dialogRef = this.dialog.open(ShippingAddressComponent, {
      width: '490px',
      height: '95vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editAddress() {
    alert('coming soon!')
  }

}
