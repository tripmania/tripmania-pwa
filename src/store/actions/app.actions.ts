import {Action} from '@ngrx/store';
import {AppState} from '@enums/AppState.enum';
import {Type} from '@angular/core';
import {IDynamicComponent} from '@interfaces/IDynamicComponent';

export enum AppActionTypes {
  CHANGE_STATIC_STATE = '[App Action] Change static state',
  ADD_DYNAMIC_COMPONENT = '[App Action] Add dynamic component',
  GO_TO_BACK_COMPONENT = '[App Action] Go to back component'
}

export class ChangeStaticState implements Action {
  readonly type = AppActionTypes.CHANGE_STATIC_STATE;

  constructor(public staticState: AppState) {
  }
}

export class AddDynamicComponent implements Action {
  readonly type = AppActionTypes.ADD_DYNAMIC_COMPONENT;

  constructor(public component: Type<IDynamicComponent>,
              public inputs: any,
              public headerTitle: string) {
  }
}

export class GoToBackComponent implements Action {
  readonly type = AppActionTypes.GO_TO_BACK_COMPONENT;

  constructor() {
  }
}

export type AppActions = ChangeStaticState
  | AddDynamicComponent
  | GoToBackComponent;
