import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicLoaderComponent } from './dynamic-loader.component';
import {DynamicLoaderDirective} from '@shared/directives/dynamic-loader.directive';

@NgModule({
  declarations: [DynamicLoaderComponent, DynamicLoaderDirective],
  imports: [
    CommonModule
  ],
  exports: [DynamicLoaderComponent]
})
export class DynamicLoaderModule { }
