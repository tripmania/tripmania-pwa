import {Action} from '@ngrx/store';
import {AppState} from '@enums/AppState.enum';
import {Type} from '@angular/core';
import {DynamicComponent} from '@entities/DynamicComponent.entity';

export enum AppActionTypes {
  CHANGE_ACTIVE_STATE = '[App Action] Change active state',
  ADD_DYNAMIC_COMPONENT = '[App Action] Add dynamic component',
  GO_TO_BACK_COMPONENT = '[App Action] Go to back component'
}

export class ChangeActiveState implements Action {
  readonly type = AppActionTypes.CHANGE_ACTIVE_STATE;

  constructor(public activeState: AppState) {
  }
}

export class AddDynamicComponent implements Action {
  readonly type = AppActionTypes.ADD_DYNAMIC_COMPONENT;

  constructor(public component: Type<DynamicComponent>,
              public inputs: any,
              public headerTitle: string) {
  }
}

export class GoToBackComponent implements Action {
  readonly type = AppActionTypes.GO_TO_BACK_COMPONENT;

  constructor() {
  }
}

export type AppActions = ChangeActiveState
  | AddDynamicComponent
  | GoToBackComponent;
