import {Action} from '@ngrx/store';
import {ITrip} from '@interfaces/dto/ITrip';

export enum TripsActionsTypes {
  LOAD_TRIPS = '[Trips Action] Load trips',
  SET_TRIPS = '[Trips Action] Set trips',
  PROCESS_ADD_TRIP = '[Trips Action] Process add trip',
  ADD_TRIP = '[Trips Action] Add trip',
  PRCESS_UPDATE_TRIP = '[Trips Action] Process update trip',
  UPDATE_TRIP = '[Trips Action] Update trip',
  PROCESS_DELETE_TRIP = '[Trips Action] Process delete trip',
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

export class ProcessAddTrip implements Action {
  readonly type = TripsActionsTypes.PROCESS_ADD_TRIP;

  constructor(public trip: ITrip,
              public photoToUpload: File) {
  }
}

export class AddTrip implements Action {
  readonly type = TripsActionsTypes.ADD_TRIP;

  constructor(public trip: ITrip) {
  }
}

export class ProcessUpdateTrip implements Action {
  readonly type = TripsActionsTypes.PRCESS_UPDATE_TRIP;

  constructor(public trip: ITrip,
              public photoToUpload: File) {
  }
}

export class UpdateTrip implements Action {
  readonly type = TripsActionsTypes.UPDATE_TRIP;

  constructor(public trip: ITrip) {
  }
}

export class ProcessDeleteTrip implements Action {
  readonly type = TripsActionsTypes.PROCESS_DELETE_TRIP;

  constructor(public tripId: number) {
  }
}

export class DeleteTrip implements Action {
  readonly type = TripsActionsTypes.DELETE_TRIP;

  constructor(public tripId: number) {
  }
}

export type TripsAction = LoadTrips
  | ProcessAddTrip
  | AddTrip
  | SetTrips
  | UpdateTrip
  | ProcessDeleteTrip
  | DeleteTrip;
