import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicLoaderComponent } from './dynamic-loader.component';
import {DynamicContainerModule} from '@shared/directives/dynamic-container/dynamic-container.module';

@NgModule({
  declarations: [DynamicLoaderComponent],
  imports: [
    CommonModule,
    DynamicContainerModule
  ],
  exports: [DynamicLoaderComponent]
})
export class DynamicLoaderModule { }
