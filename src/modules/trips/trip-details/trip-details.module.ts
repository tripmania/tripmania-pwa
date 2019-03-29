import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripDetailsComponent } from './trip-details.component';
import {
  DateAdapter, MAT_DATE_FORMATS,
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule
} from '@angular/material';
import {DatepickerSettings, MY_DATE_FORMATS} from '@shared/helpers/datepickerSettings';

@NgModule({
  declarations: [TripDetailsComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ],
  exports: [TripDetailsComponent],
  providers: [
    {provide: DateAdapter, useClass: DatepickerSettings},
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}
  ]
})
export class TripDetailsModule { }
