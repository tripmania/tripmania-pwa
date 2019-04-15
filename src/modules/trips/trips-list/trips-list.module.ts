import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripsListComponent } from './trips-list.component';
import {
  MatButtonModule,
  MatIconModule
} from '@angular/material';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {DeferLoadModule} from '@shared/directives/defer-load/defer-load.module';
import {SafeHtmlModule} from '@shared/pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [TripsListComponent],
  imports: [
    CommonModule,
    MatIconModule,
    ScrollingModule,
    DeferLoadModule,
    MatButtonModule,
    SafeHtmlModule
  ],
  exports: [TripsListComponent]
})
export class TripsListModule { }
