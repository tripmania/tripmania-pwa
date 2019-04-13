import {Action} from '@ngrx/store';
import {IViewState, IStaticViewState} from '@interfaces/IViewState';
import {IDynamicComponent} from '@interfaces/IComponent';
import {Type} from '@angular/core';

export enum AppActionTypes {
  OPEN_STATIC_VIEW = '[App Action] Open static view',
  OPEN_DYNAMIC_VIEW = '[App Action] Open dynamic view',
  GO_TO_BACK_VIEW = '[App Action] Go to back view',
  SET_HEADER_TITLE = '[App Action] Set header title',
  SET_HEADER_ACTION = '[App Action] Set header action'
}

export class OpenStaticView implements Action {
  readonly type = AppActionTypes.OPEN_STATIC_VIEW;

  constructor(public view: IStaticViewState) {
  }
}

export class OpenDynamicView implements Action {
  readonly type = AppActionTypes.OPEN_DYNAMIC_VIEW;

  constructor(public component: Type<IDynamicComponent>,
              public view: IViewState) {
  }
}

export class GoToBackView implements Action {
  readonly type = AppActionTypes.GO_TO_BACK_VIEW;

  constructor() {
  }
}

export class SetHeaderTitle implements Action {
  readonly type = AppActionTypes.SET_HEADER_TITLE;

  constructor(public title: string) {
  }
}

export class SetHeaderAction implements Action {
  readonly type = AppActionTypes.SET_HEADER_ACTION;

  constructor(public actionName: string,
              public action: () => void) {
  }
}

export type AppActions = OpenStaticView
  | OpenDynamicView
  | GoToBackView
  | SetHeaderTitle
  | SetHeaderAction;
