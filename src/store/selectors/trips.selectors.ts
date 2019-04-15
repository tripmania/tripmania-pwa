import {createFeatureSelector, createSelector} from '@ngrx/store';
import {ITripsState, TRIPS_STATE} from '@store/states/trips.state';

export const selectTripsState = createFeatureSelector<ITripsState>(TRIPS_STATE);

export const selectTrips = createSelector(
  selectTripsState,
  (state: ITripsState) => state.trips
);

export const selectTripsLoaded = createSelector(
  selectTripsState,
  (state: ITripsState) => state.tripsLoaded
);
