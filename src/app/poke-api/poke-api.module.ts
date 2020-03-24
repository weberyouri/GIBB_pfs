import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PokeApiService} from "./poke-api.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    PokeApiService
  ]
})
export class PokeAPIModule { }
