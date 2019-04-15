import {ITripsState, tripsStateInitial} from '@store/states/trips.state';
import {TripsAction, TripsActionsTypes} from '@store/actions/trips.actions';

export function tripsReducer(state: ITripsState = tripsStateInitial,
                             action: TripsAction): ITripsState {
  switch (action.type) {
    case TripsActionsTypes.SET_TRIPS:
      return {
        ...state,
        trips: action.trips,
        tripsLoaded: true
      };
    case TripsActionsTypes.ADD_TRIP:
      return {
        ...state,
        trips: state.trips.concat(action.trip)
      };
    case TripsActionsTypes.UPDATE_TRIP:
      return {
        ...state,
        trips: state.trips.map(trip => (trip.id === action.trip.id ? action.trip : trip))
      };
    case TripsActionsTypes.DELETE_TRIP:
      return {
        ...state,
        trips: state.trips.filter(trip => trip.id !== action.tripId)
      };
    default:
      return state;
  }
}
