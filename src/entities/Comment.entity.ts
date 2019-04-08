import {UserEntity} from '@entities/User.entity';

export interface CommentEntity {
  id?: number;
  publishId: number;
  user: UserEntity;
  date: number;
  comment: string;
}
