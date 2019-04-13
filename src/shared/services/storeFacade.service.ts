import {Injectable, Type} from '@angular/core';
import {Store} from '@ngrx/store';
import {selectHeaderTitle} from '@store/selectors/app.selector';
import {
  GoToBackView,
  OpenDynamicView,
  OpenStaticView,
  SetHeaderAction,
  SetHeaderTitle
} from '@store/actions/app.actions';
import {IViewState, IStaticViewState} from '@interfaces/IViewState';
import {IDynamicComponent} from '@interfaces/IComponent';

@Injectable()
export class StoreFacadeService {
  readonly headerTitle$ = this.store$.select<string>(selectHeaderTitle);

  constructor(private store$: Store<any>) {
  }

  openStaticView(staticView: IStaticViewState) {
    this.store$.dispatch(new OpenStaticView(staticView));
  }

  openDynamicView(component: Type<IDynamicComponent>, dynamicView: IViewState) {
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
