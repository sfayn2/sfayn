import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-customers-address',
  templateUrl: './customers-address.component.html',
  styleUrls: ['./customers-address.component.scss']
})
export class CustomersAddressComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CustomersAddressComponent>) {}

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
