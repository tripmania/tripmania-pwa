import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import {TripsListModule} from '@modules/trips/trips-list/trips-list.module';
import {MatButtonModule, MatIconModule} from '@angular/material';
import {SafeHtmlModule} from '@shared/pipes/safe-html/safe-html.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    TripsListModule,
    MatIconModule,
    MatButtonModule,
    SafeHtmlModule
  ],
  exports: [ProfileComponent]
})
export class ProfileModule { }
