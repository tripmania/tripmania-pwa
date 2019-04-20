import {Action} from '@ngrx/store';
import {IUser} from '@interfaces/dto/IUser';

export enum UserActionsTypes {
  LOAD_USER = '[User Action] Load user',
  SET_USER = '[User Action] Set user',
  UPDATE_USER = '[User Action] Update user',
  LOGOUT = '[User Action] Logout',
  UPDATE_USER_PHOTO = '[User Action] Update user photo',
  UPDATE_USER_INFO = '[User Action] Update user info'
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

export class UpdateUserPhoto implements Action {
  readonly type = UserActionsTypes.UPDATE_USER_PHOTO;

  constructor(public photoToUpload: File) {
  }
}

export class UpdateUserInfo implements Action {
  readonly type = UserActionsTypes.UPDATE_USER_INFO;

  constructor(public name: string, public status: string) {
  }
}

export class Logout implements Action {
  readonly type = UserActionsTypes.LOGOUT;
}

export type UserAction = LoadUser
  | SetUser
  | UpdateUserPhoto
  | UpdateUserInfo
  | UpdateUser
  | Logout;
