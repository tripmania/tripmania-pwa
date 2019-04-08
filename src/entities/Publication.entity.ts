import {UserEntity} from '@entities/User.entity';

export interface PublicationEntity {
  id?: number;
  tripId: number;
  tripName: string;
  publisher: UserEntity;
  publishDate: number;
  userComment?: string;
  photoUrl?: string;
  place?: string;
  likesCount: number;
  commentsCount: number;
}
