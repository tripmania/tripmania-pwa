import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeferLoadDirective } from './defer-load.directive';

@NgModule({
  declarations: [DeferLoadDirective],
  imports: [CommonModule],
  exports: [DeferLoadDirective]
})
export class DeferLoadModule { }
