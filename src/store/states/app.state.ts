import {IViewState, IStaticViewState} from '@interfaces/IViewState';
import {staticViews} from '@consts/staticViews';

export interface IAppState {
  activeStaticState: IStaticViewState;
  activeDynamicState: IViewState;
  dynamicStates: IViewState[];
}

export const APP_STATE = 'appState';

export const appStateInitial: IAppState = {
  activeStaticState: staticViews[0],
  activeDynamicState: null,
  dynamicStates: []
};
