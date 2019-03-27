import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsListComponent } from './tripsList.component';
import {MatIconModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';

@NgModule({
  declarations: [TripsListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ScrollingModule
  ],
  exports: [TripsListComponent]
})
export class TripsListModule { }
