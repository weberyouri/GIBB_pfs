import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Move} from "../../poke-api/model/move";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

export interface MoveSelectionDialogData {
  moves: Move[];
}

@Component({
  selector: 'app-move-selection-dialog',
  templateUrl: './move-selection-dialog.component.html',
  styleUrls: ['./move-selection-dialog.component.scss']
})
export class MoveSelectionDialogComponent implements OnInit {

  allMoves: Move[];

  allMovesFG = new FormGroup({
    moves: new FormArray([])
  });

  constructor(private dialogRef: MatDialogRef<MoveSelectionDialogComponent>,
              @Inject(MAT_DIALOG_DATA) private data: MoveSelectionDialogData) { }

  ngOnInit(): void {
    this.allMoves = this.data.moves
    this.allMoves.forEach((move, index) => {
      const control = new FormControl(index === 0);
      (this.allMovesFG.controls.moves as FormArray).push(control);
    });
  }

  close() {
    this.dialogRef.close();
  }

  submit() {
    const selectedMoves = this.allMovesFG.value.moves
      .map((v, i) => (v ? this.allMoves[i] : null))
      .filter(v => v !== null);
    this.dialogRef.close(selectedMoves);
  }

  getFormArray(): FormArray {
    return this.allMovesFG.controls.moves as FormArray;
  }

  isValid(): boolean {
    const selectedMoves = this.allMovesFG.value.moves
      .map((v, i) => (v ? this.allMoves[i] : null))
      .filter(v => v !== null);
    return selectedMoves.length >= 1 && selectedMoves.length <= 4;
  }

}
