import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamic-host]',
})
export class DynamicLoaderDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
