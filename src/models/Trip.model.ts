import {PlaceModel} from '@models/Place.model';

export interface TripModel {
  id?: number;
  userId: number;
  title: string;
  photoUrl?: string;
  startDate?: number;
  endDate?: number;
  path?: PlaceModel[];
  documents?: any;
  toTake?: string[];
  toVisitShowplaces?: string[];
}
