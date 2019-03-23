import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips.component';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [TripsComponent],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports: [TripsComponent]
})
export class TripsModule { }
