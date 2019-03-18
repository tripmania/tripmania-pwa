import {AppState} from '@enums/AppState.enum';

export interface IAppState {
  activeState: AppState;
}

export const APP_STATE = 'appState';

export const appStateInitial: IAppState = {
  activeState: AppState.HOME
};
