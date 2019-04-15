import {Action} from '@ngrx/store';
import {ITrip} from '@interfaces/dto/ITrip';

export enum TripsActionsTypes {
  LOAD_TRIPS = '[Trips Action] Load trips',
  SET_TRIPS = '[Trips Action] Set trips',
  ADD_TRIP = '[Trips Action] Add trip',
  UPDATE_TRIP = '[Trips Action] Update trip',
  DELETE_TRIP = '[Trips Action] Delete trip'
}

export class LoadTrips implements Action {
  readonly type = TripsActionsTypes.LOAD_TRIPS;

  constructor() {
  }
}

export class SetTrips implements Action {
  readonly type = TripsActionsTypes.SET_TRIPS;

  constructor(public trips: ITrip[]) {
  }
}

export class AddTrip implements Action {
  readonly type = TripsActionsTypes.ADD_TRIP;

  constructor(public trip: ITrip,
              public photoToUpload: File) {
  }
}

export class UpdateTrip implements Action {
  readonly type = TripsActionsTypes.UPDATE_TRIP;

  constructor(public trip: ITrip,
              public photoToUpload: File) {
  }
}

export class DeleteTrip implements Action {
  readonly type = TripsActionsTypes.DELETE_TRIP;

  constructor(public tripId: number) {
  }
}

export type TripsAction = LoadTrips
  | AddTrip
  | SetTrips
  | UpdateTrip
  | DeleteTrip;
