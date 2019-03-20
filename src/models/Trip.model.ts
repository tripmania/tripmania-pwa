import {PlaceModel} from '@models/Place.model';

export interface TripModel {
  id?: string;
  userId: string;
  title: string;
  photoUrl?: string;
  startDate?: number;
  endDate?: number;
  path?: PlaceModel[];
  documents?: any;
  toTake?: string[];
  toVisitShowplaces?: string[];
}
