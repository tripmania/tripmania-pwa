import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {TripsListModule} from '@modules/trips/trips-list/trips-list.module';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    TripsListModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
