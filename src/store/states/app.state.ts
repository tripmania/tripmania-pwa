import {IStaticViewState, IDynamicViewState} from '@interfaces/IViewState';
import {staticViews} from '@consts/staticViews';

export interface IAppState {
  activeStaticState: IStaticViewState;
  activeDynamicState: IDynamicViewState;
  dynamicStates: IDynamicViewState[];
}

export const APP_STATE = 'appState';

export const appStateInitial: IAppState = {
  activeStaticState: staticViews[0],
  activeDynamicState: null,
  dynamicStates: []
};
