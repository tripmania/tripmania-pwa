import {IUser} from '@interfaces/dto/IUser';

export interface IComment {
  id?: number;
  publishId: number;
  user: IUser;
  date: number;
  comment: string;
}
