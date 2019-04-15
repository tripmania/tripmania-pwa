import {Action} from '@ngrx/store';
import {IUser} from '@interfaces/dto/IUser';

export enum UserActionsTypes {
  LOAD_USER = '[User Action] Load user',
  SET_USER = '[User Action] Set user',
  UPDATE_USER = '[User Action] Update user'
}

export class LoadUser implements Action {
  readonly type = UserActionsTypes.LOAD_USER;
}

export class SetUser implements Action {
  readonly type = UserActionsTypes.SET_USER;

  constructor(public user: IUser) {
  }
}

export class UpdateUser implements Action {
  readonly type = UserActionsTypes.UPDATE_USER;

  constructor(public user: IUser, public photoToUpload?: File) {
  }
}

export type UserAction = LoadUser
  | SetUser
  | UpdateUser;
