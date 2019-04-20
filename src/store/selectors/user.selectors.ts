import {createFeatureSelector, createSelector} from '@ngrx/store';
import {IUserState, USER_STATE} from '@store/states/user.state';
import {IUser} from '@interfaces/dto/IUser';
import {IUserInfo} from '@interfaces/IUserInfo';

export const selectUserState = createFeatureSelector<IUserState>(USER_STATE);

export const selectUser = createSelector(
  selectUserState,
  (state: IUserState) => state.user
);


export const selectUserInfo = createSelector(
  selectUser,
  (user: IUser) => (<IUserInfo>{
    name: user.name,
    status: user.status,
    photoUrl: user.photoUrl
  })
);
