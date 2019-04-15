import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {UploadFilesService} from '@shared/services/upload-files.service';
import {HttpClient} from '@angular/common/http';
import {LoadTrips, SetTrips, TripsActionsTypes} from '@store/actions/trips.actions';
import {filter, map, switchMap, take} from 'rxjs/operators';
import {selectUser} from '@store/selectors/user.selectors';
import {IUser} from '@interfaces/dto/IUser';
import {apiUrls} from '@consts/apiUrls.consts';
import {ITrip} from '@interfaces/dto/ITrip';

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

  constructor(private actions$: Actions,
              private store$: Store<any>,
              private uploadFilesService: UploadFilesService,
              private http: HttpClient) {
  }
}
