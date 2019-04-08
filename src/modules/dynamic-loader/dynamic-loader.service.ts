import {Injectable, Type} from '@angular/core';
import {DynamicComponent} from '@entities/DynamicComponent.entity';
import {Subject} from 'rxjs';
import {DynamicItem} from '@models/dynamic-item.model';

@Injectable()
export class DynamicLoaderService {
  private static _currentDynamicComponentIndex = 0;

  addComponent$ = new Subject<DynamicItem>();
  removeComponent$ = new Subject<void>();
  removeAllComponents$ = new Subject<void>();

  static IsComponentHidden({componentIndex}: DynamicComponent): boolean {
    return componentIndex !== DynamicLoaderService._currentDynamicComponentIndex;
  }

  static isDynamicComponentLoaded(): boolean {
    return DynamicLoaderService._currentDynamicComponentIndex > 0;
  }

  addDynamicComponent(component: Type<DynamicComponent>, inputs: any) {
    DynamicLoaderService._currentDynamicComponentIndex += 1;
    this.addComponent$.next(new DynamicItem(component, DynamicLoaderService._currentDynamicComponentIndex, inputs));
  }

  removeLastDynamicComponent() {
    DynamicLoaderService._currentDynamicComponentIndex -= 1;
    this.removeComponent$.next();
  }
}
