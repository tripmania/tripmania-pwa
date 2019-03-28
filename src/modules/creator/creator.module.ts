import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorComponent } from './creator.component';
import {MatTabsModule} from '@angular/material';
import {TripDetailsModule} from '../trips/trip-details/trip-details.module';

@NgModule({
  declarations: [CreatorComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    TripDetailsModule
  ],
  exports: [CreatorComponent]
})
export class CreatorModule { }
