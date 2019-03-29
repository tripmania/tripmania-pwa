import {UserModel} from '@models/User.model';

export interface PublicationModel {
  id?: number;
  tripId: number;
  tripName: string;
  publisher: UserModel;
  publishDate: number;
  userComment?: string;
  photoUrl?: string;
  place?: string;
  likesCount: number;
  commentsCount: number;
}
