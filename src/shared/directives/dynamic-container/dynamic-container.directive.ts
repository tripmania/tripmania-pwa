import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[dynamicHost]',
})
export class DynamicContainerDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
