import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoveSelectionDialogComponent } from './move-selection-dialog.component';

describe('MoveSelectionDialogComponent', () => {
  let component: MoveSelectionDialogComponent;
  let fixture: ComponentFixture<MoveSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoveSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoveSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
