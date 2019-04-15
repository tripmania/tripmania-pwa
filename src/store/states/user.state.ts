import {IUser} from '@interfaces/dto/IUser';

export interface IUserState {
  user: IUser;
  // followers
  // followings
}

export const USER_STATE = 'userState';

export const userStateInitial: IUserState = {
  user: null
};
