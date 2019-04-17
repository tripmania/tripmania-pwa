import {Injectable, Type} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  selectActiveDynamicState,
  selectActiveStaticState,
  selectAllDynamicStates,
  selectHeaderOptions,
  selectIsDynamicLoaded
} from '@store/selectors/app.selectors';
import {
  GoToBackView,
  OpenDynamicView,
  OpenStaticView,
  SetHeaderAction,
  SetHeaderTitle, SetHeaderTransparent
} from '@store/actions/app.actions';
import {IStaticViewState, IDynamicViewState} from '@interfaces/IViewState';
import {IDynamicComponent} from '@interfaces/IComponent';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {IHeaderOptions} from '@interfaces/IHeaderOptions';

@Injectable()
export class AppStateService {
  readonly headerOptions$ = this.store$.select<IHeaderOptions>(selectHeaderOptions);
  readonly isDynamicComponentLoaded$ = this.store$.select<boolean>(selectIsDynamicLoaded);
  readonly activeStaticState$ = this.store$.select<IStaticViewState>(selectActiveStaticState);
  readonly activeDynamicState$ = this.store$.select<IDynamicViewState>(selectActiveDynamicState);
  readonly allDynamicStates$ = this.store$.select<IDynamicViewState[]>(selectAllDynamicStates);

  constructor(private store$: Store<any>) {
  }

  isStaticComponentHidden(name: string): Observable<boolean> {
    return combineLatest(
      this.activeStaticState$,
      this.isDynamicComponentLoaded$
    )
      .pipe(
        map(([staticState, isLoaded]) => staticState.componentName !== name || isLoaded)
      );
  }

  isDynamicComponentHidden({componentIndex}: IDynamicComponent): Observable<boolean> {
    return this.activeDynamicState$
      .pipe(
        map(dynamicState => !dynamicState || dynamicState.componentIndex !== componentIndex)
      );
  }

  openStaticView(staticView: IStaticViewState) {
    this.store$.dispatch(new OpenStaticView(staticView));
  }

  openDynamicView(component: Type<IDynamicComponent>, dynamicView: IDynamicViewState) {
    this.store$.dispatch(new OpenDynamicView(component, dynamicView));
  }

  goToBackView() {
    this.store$.dispatch(new GoToBackView());
  }

  setHeaderTitle(title: string) {
    this.store$.dispatch(new SetHeaderTitle(title));
  }

  setHeaderAction(actionName: string, action: () => void, isIcon = false) {
    this.store$.dispatch(new SetHeaderAction(actionName, action, isIcon));
  }

  setHeaderTransparent() {
    this.store$.dispatch(new SetHeaderTransparent());
  }
}
