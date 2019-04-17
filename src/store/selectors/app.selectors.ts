import {createFeatureSelector, createSelector} from '@ngrx/store';
import {APP_STATE, IAppState} from '@store/states/app.state';

export const selectAppState = createFeatureSelector<IAppState>(APP_STATE);

export const selectHeaderOptions = createSelector(
  selectAppState,
  (state: IAppState) => {
    const dynamicsLen = state.dynamicStates.length;

    if (dynamicsLen !== 0 && !!state.activeDynamicState) {
      return state.activeDynamicState.headerOptions;
    }

    return state.activeStaticState.headerOptions;
  }
);

export const selectActiveDynamicState = createSelector(
  selectAppState,
  (state: IAppState) => state.activeDynamicState
);

export const selectActiveStaticState = createSelector(
  selectAppState,
  (state: IAppState) => state.activeStaticState
);

export const selectAllDynamicStates = createSelector(
  selectAppState,
  (state: IAppState) => state.dynamicStates
);

export const selectIsDynamicLoaded = createSelector(
  selectAppState,
  (state: IAppState) => !!state.activeDynamicState
);
