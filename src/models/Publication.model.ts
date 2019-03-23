import {UserModel} from '@models/User.model';
import {PlaceModel} from '@models/Place.model';

export interface PublicationModel {
  id?: number;
  tripId: number;
  tripName: string;
  publisher: UserModel;
  publishDate: number;
  userComment?: string;
  photoUrl?: string;
  place?: PlaceModel;
  likesCount: number;
  commentsCount: number;
}
