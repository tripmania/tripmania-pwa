import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDetailsComponent } from './trip-details.component';
import {
  DateAdapter, MAT_DATE_FORMATS,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule, MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule, MatRippleModule
} from '@angular/material';
import {DatepickerSettings, MY_DATE_FORMATS} from '@shared/helpers/datepickerSettings';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SafeHtmlModule} from '@shared/pipes/safe-html/safe-html.module';
import {DeleteTripDialogComponent} from '@modules/trips/delete-trip-dialog/delete-trip-dialog.component';

@NgModule({
  declarations: [TripDetailsComponent, DeleteTripDialogComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    FormsModule,
    ReactiveFormsModule,
    MatRippleModule,
    SafeHtmlModule,
    MatDialogModule
  ],
  exports: [TripDetailsComponent],
  entryComponents: [DeleteTripDialogComponent],
  providers: [
    {provide: DateAdapter, useClass: DatepickerSettings},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class TripDetailsModule { }
