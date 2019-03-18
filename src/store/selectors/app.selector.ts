import {createFeatureSelector, createSelector} from '@ngrx/store';
import {APP_STATE, IAppState} from '@store/states/app.state';

export const selectAppState = createFeatureSelector<IAppState>(APP_STATE);

export const selectActiveAppState = createSelector(
  selectAppState,
  (state: IAppState) => state.activeState
);
