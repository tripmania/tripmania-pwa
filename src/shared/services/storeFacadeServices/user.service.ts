import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {IUser} from '@interfaces/dto/IUser';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from '@consts/apiUrls.consts';
import {Logout, SetUser} from '@store/actions/user.actions';
import {selectUser} from '@store/selectors/user.selectors';
import {Router} from '@angular/router';
import {removeTokens} from '@shared/helpers/tokens.helpers';

@Injectable()
export class UserService {
  readonly user$ = this.store$.select<IUser>(selectUser);

  constructor(private store$: Store<any>,
              private http: HttpClient,
              private router: Router) {
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

  logout() {
    removeTokens();
    setTimeout(() => {
      this.store$.dispatch(new Logout());
    }, 100);
    this.router.navigate(['/auth/sign-in'], {replaceUrl: true});
  }
}
