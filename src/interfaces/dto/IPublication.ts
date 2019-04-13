import {IUser} from '@interfaces/dto/IUser';

export interface IPublication {
  id?: number;
  tripId: number;
  tripName: string;
  publisher: IUser;
  publishDate: number;
  userComment?: string;
  photoUrl?: string;
  place?: string;
  likesCount: number;
  commentsCount: number;
}
