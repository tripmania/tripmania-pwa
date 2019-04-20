import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
import {FilesService} from '@shared/services/files.service';
import {HttpClient} from '@angular/common/http';
import {SetUser, UpdateUserInfo, UpdateUserPhoto, UserActionsTypes} from '@store/actions/user.actions';
import {map, switchMap, take} from 'rxjs/operators';
import {of, zip} from 'rxjs';
import {selectUserInfo} from '@store/selectors/user.selectors';
import {apiUrls} from '@consts/apiUrls.consts';
import {IUser} from '@interfaces/dto/IUser';

@Injectable()
export class UserEffects {
  @Effect()
  onPhotoUpload$ = this.action$
    .pipe(
      ofType<UpdateUserPhoto>(UserActionsTypes.UPDATE_USER_PHOTO),
      switchMap(({photoToUpload}: UpdateUserPhoto) => this.filesService.uploadFile(photoToUpload)),
      switchMap(photoUrl => zip(
        of(photoUrl),
        this.store$.pipe(select(selectUserInfo), take(1))
      )),
      switchMap(([photoUrl, userInfo]) => this.http.put<IUser>(`${apiUrls.USER_URL}/updateUserInfo`, {
        ...userInfo,
        photoUrl
      })),
      map((user: IUser) => new SetUser(user))
    );

  @Effect()
  onInfoUpdate$ = this.action$
    .pipe(
      ofType<UpdateUserInfo>(UserActionsTypes.UPDATE_USER_INFO),
      switchMap(({name, status}) => zip(
        of(name),
        of(status),
        this.store$.pipe(select(selectUserInfo), take(1))
      )),
      switchMap(([name, status, userInfo]) => this.http.put<IUser>(`${apiUrls.USER_URL}/updateUserInfo`, {
        ...userInfo,
        name,
        status
      })),
      map((user: IUser) => new SetUser(user))
    );

  constructor(private action$: Actions,
              private store$: Store<any>,
              private filesService: FilesService,
              private http: HttpClient) {
  }
}
