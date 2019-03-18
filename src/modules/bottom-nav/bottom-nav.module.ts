import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavComponent } from './bottom-nav.component';
import {MatButtonModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [BottomNavComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports: [BottomNavComponent]
})
export class BottomNavModule { }
