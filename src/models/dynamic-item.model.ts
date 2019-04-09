import {Type} from '@angular/core';
import {DynamicComponent} from '@entities/DynamicComponent.entity';

export class DynamicItem {
  constructor(public component: Type<DynamicComponent>, public componentIndex: number, public inputs: any = null) {}
}
