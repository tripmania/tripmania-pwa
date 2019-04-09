import {Injectable, Type} from '@angular/core';
import {IDynamicComponent} from '@interfaces/IDynamicComponent';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {DynamicItem} from '@models/dynamic-item';
import {map} from 'rxjs/operators';

@Injectable()
export class DynamicLoaderService {
  private static _currentDynamicComponentIndex = 0;
  private static _isDynamicLoaded = new BehaviorSubject<number>(0);

  addComponent$ = new Subject<DynamicItem>();
  removeComponent$ = new Subject<void>();
  removeAllComponents$ = new Subject<void>();

  static IsComponentHidden({componentIndex}: IDynamicComponent): boolean {
    return componentIndex !== DynamicLoaderService._currentDynamicComponentIndex;
  }

  static isDynamicComponentLoaded(): Observable<boolean> {
    return DynamicLoaderService._isDynamicLoaded.asObservable()
      .pipe(
        map(currentIndex => currentIndex > 0)
      );
  }

  addDynamicComponent(component: Type<IDynamicComponent>, inputs: any) {
    DynamicLoaderService._currentDynamicComponentIndex += 1;
    DynamicLoaderService._isDynamicLoaded.next(DynamicLoaderService._currentDynamicComponentIndex);
    this.addComponent$.next(new DynamicItem(component, DynamicLoaderService._currentDynamicComponentIndex, inputs));
  }

  removeLastDynamicComponent() {
    DynamicLoaderService._currentDynamicComponentIndex -= 1;
    DynamicLoaderService._isDynamicLoaded.next(DynamicLoaderService._currentDynamicComponentIndex);
    this.removeComponent$.next();
  }

  removeAllDynamicComponents() {
    DynamicLoaderService._currentDynamicComponentIndex = 0;
    DynamicLoaderService._isDynamicLoaded.next(DynamicLoaderService._currentDynamicComponentIndex);
    this.removeAllComponents$.next();
  }
}
