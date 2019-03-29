export interface TripModel {
  id?: number;
  userId: number;
  title: string;
  photoUrl?: string;
  startDate?: number;
  endDate?: number;
  path?: string[];
  documents?: any;
  toTake?: string[];
  toVisitShowplaces?: string[];
}
