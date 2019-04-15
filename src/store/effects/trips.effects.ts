import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {FilesService} from '@shared/services/files.service';
import {HttpClient} from '@angular/common/http';
import {
  AddTrip, DeleteTrip,
  LoadTrips,
  ProcessAddTrip,
  ProcessDeleteTrip, ProcessUpdateTrip,
  SetTrips,
  TripsActionsTypes, UpdateTrip
} from '@store/actions/trips.actions';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {selectUser} from '@store/selectors/user.selectors';
import {IUser} from '@interfaces/dto/IUser';
import {apiUrls} from '@consts/apiUrls.consts';
import {ITrip} from '@interfaces/dto/ITrip';
import {of, zip} from 'rxjs';

@Injectable()
export class TripsEffects {

  @Effect()
  onLoadTrips$ = this.actions$
    .pipe(
      ofType<LoadTrips>(TripsActionsTypes.LOAD_TRIPS),
      switchMap(() => this.store$.select<IUser>(selectUser)
        .pipe(
          filter(user => !!user),
          take(1),
          map(user => user.id)
        )
      ),
      switchMap(userId => this.http.get<ITrip[]>(`${apiUrls.TRIPS_URL}/user/${userId}`).pipe(take(1))),
      map((trips: ITrip[]) => new SetTrips(trips))
    );

  @Effect()
  onAddTrip$ = this.actions$
    .pipe(
      ofType<ProcessAddTrip>(TripsActionsTypes.PROCESS_ADD_TRIP),
      switchMap(action => {
        if (!action.photoToUpload) {
          return zip(of(action.trip), of(action.trip.photoUrl));
        }

        return zip(
          of(action.trip),
          this.filesService.uploadFile(action.photoToUpload).pipe(take(1))
        );
      }),
      map(([trip, photoUrl]) => {
        trip.photoUrl = photoUrl;

        return trip;
      }),
      switchMap(trip => this.http.post<ITrip>(`${apiUrls.TRIPS_URL}`, trip).pipe(take(1))),
      map(trip => new AddTrip(trip))
    );

  @Effect()
  onUpdateTrip$ = this.actions$
    .pipe(
      ofType<ProcessUpdateTrip>(TripsActionsTypes.PRCESS_UPDATE_TRIP),
      switchMap(action => {
        if (!action.photoToUpload) {
          return zip(of(action.trip), of(action.trip.photoUrl));
        }

        return zip(
          of(action.trip),
          this.filesService.uploadFile(action.photoToUpload).pipe(take(1))
        );
      }),
      map(([trip, photoUrl]) => {
        trip.photoUrl = photoUrl;

        return trip;
      }),
      switchMap(trip => this.http.put<ITrip>(`${apiUrls.TRIPS_URL}`, trip).pipe(take(1))),
      map(trip => new UpdateTrip(trip))
    );

  @Effect()
  onDeleteTrip$ = this.actions$
    .pipe(
      ofType<ProcessDeleteTrip>(TripsActionsTypes.PROCESS_DELETE_TRIP),
      switchMap(({tripId}) => zip(
        of(tripId),
        this.http.delete(`${apiUrls.TRIPS_URL}/${tripId}`).pipe(take(1)))
      ),
      map(([tripId, ]) => new DeleteTrip(tripId))
    );

  constructor(private actions$: Actions,
              private store$: Store<any>,
              private filesService: FilesService,
              private http: HttpClient) {
  }
}
