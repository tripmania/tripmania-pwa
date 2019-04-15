import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {ITrip} from '@interfaces/dto/ITrip';
import {selectTrips, selectTripsLoaded} from '@store/selectors/trips.selectors';
import {IUser} from '@interfaces/dto/IUser';
import {selectUser} from '@store/selectors/user.selectors';
import {filter, switchMap, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {LoadTrips, ProcessAddTrip, ProcessDeleteTrip} from '@store/actions/trips.actions';
import {apiUrls} from '@consts/apiUrls.consts';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class TripsService {
  readonly tripsLoaded$ = this.store$.select<boolean>(selectTripsLoaded);
  private readonly trips$ = this.store$.select<ITrip[]>(selectTrips);

  constructor(private store$: Store<any>,
              private http: HttpClient) {
  }

  loadTrips() {
    this.store$.dispatch(new LoadTrips());
  }

  getTripsByUserId(userId?: number): Observable<ITrip[]> {
    return this.store$.select<IUser>(selectUser)
      .pipe(
        filter(user => !!user),
        switchMap(user => {
          if (!userId || user.id === userId) {
            return this.trips$;
          }

          return this.http.get<ITrip[]>(`${apiUrls.TRIPS_URL}/user/${userId}`)
            .pipe(
              take(1)
            );
        })
      );
  }

  getTripById(tripId: number) {
  }

  addTrip(trip: ITrip, photoToUpload: File) {
    this.store$.dispatch(new ProcessAddTrip(trip, photoToUpload));
  }

  updateTrip(trip: ITrip, photoToUpload: File) {
  }

  deleteTrip(tripId: number) {
    this.store$.dispatch(new ProcessDeleteTrip(tripId));
  }
}
