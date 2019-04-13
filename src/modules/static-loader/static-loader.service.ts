import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';
import {map} from 'rxjs/operators';
import {staticViews} from '@consts/staticViews';

@Injectable()
export class StaticLoaderService {
  private static _currentComponentName$ = new BehaviorSubject<string>(staticViews[0].componentName);

  static SetCurrentComponentName(name: string) {
    StaticLoaderService._currentComponentName$.next(name);
  }

  static isComponentHidden(name: string): Observable<boolean> {
    return combineLatest(
      StaticLoaderService._currentComponentName$,
      DynamicLoaderService.isDynamicComponentLoaded()
    )
      .pipe(
        map(([staticComponentName, isDynamicsLoaded]) => isDynamicsLoaded || staticComponentName !== name)
      );
  }
}
