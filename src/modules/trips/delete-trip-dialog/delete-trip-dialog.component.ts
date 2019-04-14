import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export interface DeleteTripDialogData {
  title: string;
}

@Component({
  selector: 'delete-trip-dialog',
  templateUrl: './delete-trip-dialog.component.html'
})
export class DeleteTripDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DeleteTripDialogData) { }

  ngOnInit() {
  }

}
