import {Injectable, Type} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import {AppState} from '@enums/AppState.enum';
import {selectActiveAppState, selectHeaderTitle} from '@store/selectors/app.selector';
import {AddDynamicComponent, ChangeActiveState, GoToBackComponent} from '@store/actions/app.actions';
import {DynamicComponent} from '@entities/DynamicComponent.entity';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';

@Injectable()
export class StoreFacadeService {
  readonly activeAppState$ = this.store$.select<AppState>(selectActiveAppState);
  readonly headerTitle$ = this.store$.select<string>(selectHeaderTitle);

  constructor(private store$: Store<any>) {
  }

  openComponent(component: Type<DynamicComponent>, inputs: any, headerTitle: string) {
    this.store$.dispatch(new AddDynamicComponent(component, inputs, headerTitle));
  }

  goToBackComponent() {
    this.store$.dispatch(new GoToBackComponent());
  }

  changeActiveState(appState: AppState) {
    combineLatest(
      this.activeAppState$,
      DynamicLoaderService.isDynamicComponentLoaded()
    )
      .pipe(take(1))
      .subscribe(([state, isDynamicLoaded]) => {
        if (state !== appState || isDynamicLoaded) {
          this.store$.dispatch(new ChangeActiveState(appState));
        }
      });
  }

  isMainComponentHidden(state: AppState): Observable<boolean> {
    return combineLatest(
      this.activeAppState$,
      DynamicLoaderService.isDynamicComponentLoaded()
    )
      .pipe(
        map(([activeState, isDynamicLoaded]) => activeState !== state || isDynamicLoaded)
      );
  }
}
