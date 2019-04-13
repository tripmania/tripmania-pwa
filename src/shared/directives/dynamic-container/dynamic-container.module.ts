import {NgModule} from '@angular/core';
import {DynamicContainerDirective} from '@shared/directives/dynamic-container/dynamic-container.directive';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [DynamicContainerDirective],
  imports: [CommonModule],
  exports: [DynamicContainerDirective]
})
export class DynamicContainerModule {
}
