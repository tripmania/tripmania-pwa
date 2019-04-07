import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsListComponent } from './trips-list.component';
import {MatIconModule} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DeferLoadModule} from '@shared/directives/defer-load/defer-load.module';

@NgModule({
  declarations: [TripsListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ScrollingModule,
    DeferLoadModule
  ],
  exports: [TripsListComponent]
})
export class TripsListModule { }
