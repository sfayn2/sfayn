import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material-module';
import { GraphQLModule } from './graphql.module' 


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    GraphQLModule
  ],
  exports: [
    CommonModule,
    MaterialModule,
    GraphQLModule
  ]
})
export class SharedModule { }
