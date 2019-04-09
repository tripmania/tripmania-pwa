import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatorComponent } from './creator.component';
import {MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [CreatorComponent],
  imports: [
    CommonModule,
    MatTabsModule
  ],
  exports: [CreatorComponent]
})
export class CreatorModule { }
