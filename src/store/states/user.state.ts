import {IUser} from '@interfaces/dto/IUser';

export interface IUserState {
  user: IUser;
}

export const USER_STATE = 'userState';

export const userStateInitial: IUserState = {
  user: null
};
