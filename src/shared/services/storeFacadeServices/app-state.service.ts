import {Injectable, Type} from '@angular/core';
import {Store} from '@ngrx/store';
import {
  selectActiveDynamicState,
  selectActiveStaticState,
  selectHeaderActionFunc,
  selectHeaderActionName,
  selectHeaderTitle, selectIsDynamicLoaded
} from '@store/selectors/app.selectors';
import {
  GoToBackView,
  OpenDynamicView,
  OpenStaticView,
  SetHeaderAction,
  SetHeaderTitle
} from '@store/actions/app.actions';
import {IStaticViewState, IDynamicViewState} from '@interfaces/IViewState';
import {IDynamicComponent} from '@interfaces/IComponent';
import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()
export class AppStateService {
  readonly headerTitle$ = this.store$.select<string>(selectHeaderTitle);
  readonly headerActionName$ = this.store$.select<string>(selectHeaderActionName);
  readonly headerActionFunc$ = this.store$.select<() => void>(selectHeaderActionFunc);
  readonly isDynamicComponentLoaded$ = this.store$.select<boolean>(selectIsDynamicLoaded);

  private readonly activeStaticState$ = this.store$.select<IStaticViewState>(selectActiveStaticState);
  private readonly activeDynamicState$ = this.store$.select<IDynamicViewState>(selectActiveDynamicState);

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

  setHeaderAction(actionName: string, action: () => void) {
    this.store$.dispatch(new SetHeaderAction(actionName, action));
  }
}
