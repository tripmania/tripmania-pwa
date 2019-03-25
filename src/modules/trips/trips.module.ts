import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsComponent } from './trips.component';
import {MatIconModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [TripsComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ScrollingModule
  ],
  exports: [TripsComponent]
})
export class TripsModule { }
