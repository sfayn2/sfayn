import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutMainComponent } from './layout/layout-main/layout-main.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../@shared/shared.module';



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
