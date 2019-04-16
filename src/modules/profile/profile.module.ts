import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {TripsListModule} from '@modules/trips/trips-list/trips-list.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    TripsListModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
