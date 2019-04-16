import {Injectable, Type} from '@angular/core';
import {IDynamicComponent} from '@interfaces/IComponent';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DynamicItem} from '@models/dynamic-item';
import {map} from 'rxjs/operators';

@Injectable()
export class DynamicLoaderService {
  private static _currentDynamicComponentIndex = 0;
  static _currentDynamicComponentIndex$ = new BehaviorSubject<number>(0);

  addComponent$ = new Subject<DynamicItem>();
  removeComponent$ = new Subject<void>();
  removeAllComponents$ = new Subject<void>();

  static IsComponentHidden({componentIndex}: IDynamicComponent): Observable<boolean> {
    return DynamicLoaderService._currentDynamicComponentIndex$
      .pipe(
        map(currentComponentIndex => componentIndex !== currentComponentIndex)
      );
  }

  static isDynamicComponentLoadedSync(): boolean {
    return DynamicLoaderService._currentDynamicComponentIndex > 0;
  }

  addDynamicComponent(component: Type<IDynamicComponent>, inputs: any) {
    DynamicLoaderService._currentDynamicComponentIndex += 1;

    DynamicLoaderService._currentDynamicComponentIndex$
      .next(DynamicLoaderService._currentDynamicComponentIndex);

    this.addComponent$.next(new DynamicItem(component, DynamicLoaderService._currentDynamicComponentIndex, inputs));
  }

  removeLastDynamicComponent() {
    if (DynamicLoaderService._currentDynamicComponentIndex !== 0) {
      DynamicLoaderService._currentDynamicComponentIndex -= 1;

      DynamicLoaderService._currentDynamicComponentIndex$
        .next(DynamicLoaderService._currentDynamicComponentIndex);

      this.removeComponent$.next();
    }
  }

  removeAllDynamicComponents() {
    DynamicLoaderService._currentDynamicComponentIndex = 0;

    DynamicLoaderService._currentDynamicComponentIndex$
      .next(DynamicLoaderService._currentDynamicComponentIndex);

    this.removeAllComponents$.next();
  }
}
