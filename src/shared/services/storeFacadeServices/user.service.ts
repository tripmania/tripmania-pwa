import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IUser} from '@interfaces/dto/IUser';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from '@consts/apiUrls.consts';
import {SetUser} from '@store/actions/user.actions';
import {selectUser} from '@store/selectors/user.selectors';

@Injectable()
export class UserService {
  readonly user$ = this.store$.select<IUser>(selectUser);

  constructor(private store$: Store<any>,
              private http: HttpClient) {
  }

  loadUser() {
    this.http.get(`${apiUrls.USER_URL}`)
      .subscribe((user: IUser) => {
        this.store$.dispatch(new SetUser(user));
      });
  }

  // getUserById(userId: number): Observable<IUser> {
  //   // получаю юзера по id
  // }

  updateUser(user: IUser, photoToUpload?: File) {
  }
}
