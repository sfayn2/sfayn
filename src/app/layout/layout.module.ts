import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
import { FormsModule } from '@angular/forms';
import { 
  LayoutMainComponent,
} from '@/layout/layout';
import {
  LayoutRoutingModule
} from './layout-routing.module'



@NgModule({
  declarations: [
    LayoutMainComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class LayoutModule { }
