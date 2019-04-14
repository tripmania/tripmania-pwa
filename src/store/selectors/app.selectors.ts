import {createFeatureSelector, createSelector} from '@ngrx/store';
import {APP_STATE, IAppState} from '@store/states/app.state';

export const selectAppState = createFeatureSelector<IAppState>(APP_STATE);

export const selectHeaderTitle = createSelector(
  selectAppState,
  (state: IAppState) => {
    const dynamicsLen = state.dynamicStates.length;

    if (dynamicsLen !== 0 && !!state.activeDynamicState) {
      return state.activeDynamicState.headerOptions.title;
    }

    return state.activeStaticState.headerOptions.title;
  }
);

export const selectHeaderActionName = createSelector(
  selectAppState,
  (state: IAppState) => {
    const dynamicsLen = state.dynamicStates.length;

    if (dynamicsLen !== 0 && !!state.activeDynamicState) {
      return state.activeDynamicState.headerOptions.actionName;
    }

    return state.activeStaticState.headerOptions.actionName;
  }
);

export const selectHeaderActionFunc = createSelector(
  selectAppState,
  (state: IAppState) => {
    const dynamicsLen = state.dynamicStates.length;

    if (dynamicsLen !== 0 && !!state.activeDynamicState) {
      return state.activeDynamicState.headerOptions.action;
    }

    return state.activeStaticState.headerOptions.action;
  }
);