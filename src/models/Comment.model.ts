import {UserModel} from '@models/User.model';

export interface CommentModel {
  id?: number;
  publishId: number;
  user: UserModel;
  date: number;
  comment: string;
}
