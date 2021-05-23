import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ProductService, 
  ProductsGQLService,
  AuthService
} from '@/core/service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ProductService, AuthService, ProductsGQLService],
})
export class CoreModule { }
