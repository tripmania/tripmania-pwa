export interface ITrip {
  id?: number;
  userId?: number;
  title: string;
  photoUrl?: string;
  localPhotoUrl?: string;
  startDate?: number;
  endDate?: number;
  path?: string[];
  documents?: any;
  toTake?: string[];
  toVisitShowplaces?: string[];
}
