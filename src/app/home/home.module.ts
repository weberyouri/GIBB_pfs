import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatDialogModule} from "@angular/material/dialog";
import { MoveSelectionDialogComponent } from './move-selection-dialog/move-selection-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [HomeComponent, MoveSelectionDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
