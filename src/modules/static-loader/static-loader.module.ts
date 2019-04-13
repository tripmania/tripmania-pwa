import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticLoaderComponent } from './static-loader.component';
import {DynamicContainerModule} from '@shared/directives/dynamic-container/dynamic-container.module';

@NgModule({
  declarations: [StaticLoaderComponent],
  imports: [
    CommonModule,
    DynamicContainerModule
  ],
  exports: [StaticLoaderComponent]
})
export class StaticLoaderModule { }
