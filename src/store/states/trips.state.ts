import {ITrip} from '@interfaces/dto/ITrip';

export interface ITripsState {
  trips: ITrip[];
  tripsLoaded: boolean;
}

export const TRIPS_STATE = 'tripsState';

export const tripsStateInitial: ITripsState = {
  trips: [],
  tripsLoaded: false
};
