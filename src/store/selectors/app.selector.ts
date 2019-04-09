import {createFeatureSelector, createSelector} from '@ngrx/store';
import {APP_STATE, IAppState} from '@store/states/app.state';
import {mainHeaderTitles} from '@consts/mainHeaderTitles.consts';

export const selectAppState = createFeatureSelector<IAppState>(APP_STATE);

export const selectActiveAppState = createSelector(
  selectAppState,
  (state: IAppState) => state.activeState
);

export const selectHeaderTitle = createSelector(
  selectAppState,
  (state: IAppState) => {
    const titlesCount = state.headerTitles.length;

    if (titlesCount === 0) {
      return mainHeaderTitles[state.activeState];
    }

    return state.headerTitles[titlesCount - 1];
  }
);
