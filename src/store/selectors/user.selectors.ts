import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IUserState, USER_STATE} from '@store/states/user.state';

export const selectUserState = createFeatureSelector<IUserState>(USER_STATE);

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state.user
);
