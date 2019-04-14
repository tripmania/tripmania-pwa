import {Type} from '@angular/core';
import {IDynamicComponent} from '@interfaces/IComponent';

export class DynamicItem {
  constructor(public component: Type<IDynamicComponent>, public componentIndex: number, public inputs: any = null) {}
}