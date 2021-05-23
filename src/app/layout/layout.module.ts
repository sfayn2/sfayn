import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@/shared';
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
    SharedModule
  ]
})
export class LayoutModule { }
