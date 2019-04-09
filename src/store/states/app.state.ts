import {AppState} from '@enums/AppState.enum';

export interface IAppState {
  staticState: AppState;
  headerTitles: string[];
}
export interface IActiveViewState {
  component: any;
  inputs: any;
  index: any;
  isStatic: any;
  headerOptions: {
    title: string;
    action: () => void;
    actionName: string;
  };
}

export interface InterfaceState {
  activeState: IActiveViewState;
  stateTrace: IActiveViewState[];
}

export const APP_STATE = 'appState';

export const appStateInitial: IAppState = {
  staticState: AppState.TRIPS,
  headerTitles: []
};
