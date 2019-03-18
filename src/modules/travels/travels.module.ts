import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TravelsComponent } from './travels.component';

@NgModule({
  declarations: [TravelsComponent],
  imports: [
    CommonModule
  ],
  exports: [TravelsComponent]
})
export class TravelsModule { }
