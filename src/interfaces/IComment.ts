import {IUser} from '@interfaces/IUser';

export interface IComment {
  id?: number;
  publishId: number;
  user: IUser;
  date: number;
  comment: string;
}
