import {UserModel} from '@models/User.model';

export interface CommentModel {
  id?: string;
  publishId: string;
  user: UserModel;
  date: number;
  comment: string;
}
