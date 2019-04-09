import {Injectable, Type} from '@angular/core';
import {combineLatest, Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {map, take} from 'rxjs/operators';
import {AppState} from '@enums/AppState.enum';
import {selectHeaderTitle, selectStaticAppState} from '@store/selectors/app.selector';
import {AddDynamicComponent, ChangeStaticState, GoToBackComponent} from '@store/actions/app.actions';
import {IDynamicComponent} from '@interfaces/IDynamicComponent';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';

@Injectable()
export class StoreFacadeService {
  readonly staticAppState$ = this.store$.select<AppState>(selectStaticAppState);
  readonly headerTitle$ = this.store$.select<string>(selectHeaderTitle);

  constructor(private store$: Store<any>) {
  }

  openComponent(component: Type<IDynamicComponent>, inputs: any, headerTitle: string) {
    console.log('component.name: ', component.name);
    this.store$.dispatch(new AddDynamicComponent(component, inputs, headerTitle));
  }

  goToBackComponent() {
    this.store$.dispatch(new GoToBackComponent());
  }

  changeStaticState(appState: AppState) {
    combineLatest(
      this.staticAppState$,
      DynamicLoaderService.isDynamicComponentLoaded()
    )
      .pipe(take(1))
      .subscribe(([state, isDynamicLoaded]) => {
        if (state !== appState || isDynamicLoaded) {
          this.store$.dispatch(new ChangeStaticState(appState));
        }
      });
  }

  isStaticComponentHidden(state: AppState): Observable<boolean> {
    return combineLatest(
      this.staticAppState$,
      DynamicLoaderService.isDynamicComponentLoaded()
    )
      .pipe(
        map(([activeState, isDynamicLoaded]) => activeState !== state || isDynamicLoaded)
      );
  }
}
