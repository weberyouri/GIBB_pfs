import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from './home.component';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';



@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
