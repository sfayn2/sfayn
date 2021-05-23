import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; //this will stop all animations only use for optimization where u dont want to animate
import { LayoutModule } from '@/layout';
import { CoreModule } from '@/core';
import { SharedModule } from '@/shared';

@NgModule({
  declarations: [
    AppComponent,
    //LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    CoreModule,
    SharedModule
  ],
  //entryComponents: [LoginComponent, ShippingAddressComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
    constructor() {


   }

}
