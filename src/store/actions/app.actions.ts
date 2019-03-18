import {Action} from '@ngrx/store';
import {AppState} from '@enums/AppState.enum';

export enum AppActionTypes {
  CHANGE_ACTIVE_STATE = '[App Action] Change active state'
}

export class ChangeActiveState implements Action {
  readonly type = AppActionTypes.CHANGE_ACTIVE_STATE;

  constructor(public activeState: AppState) {
  }
}

export type AppActions = ChangeActiveState;
