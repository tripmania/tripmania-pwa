import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {apiUrls} from '@consts/apiUrls.consts';
import {setTokens} from '@shared/helpers/tokens.helpers';
import {ErrorService} from '@shared/services/error.service';

@Injectable()
export class AuthService {
  constructor(private router: Router,
              private http: HttpClient,
              private errorService: ErrorService) {
  }

  signIn(login: string, password: string) {
    this.http.post(`${apiUrls.USER_URL}/sign-in`, {
      login,
      password
    })
      .subscribe(
        (result: {accessToken: string, refreshToken: string}) => {
          setTokens(result.accessToken, result.refreshToken);

          this.router.navigate(['/'], {replaceUrl: true});
        },
        error => {
          this.errorService.showErrorMessage(error);
        }
      );
  }

  signUp(name: string, email: string, login: string, password: string) {
    this.http.post(`${apiUrls.USER_URL}/sign-up`, {
      name,
      email,
      login,
      password
    })
      .subscribe(
        (result: {accessToken: string, refreshToken: string}) => {
          setTokens(result.accessToken, result.refreshToken);

          this.router.navigate(['/'], {replaceUrl: true});
        },
        error => {
          this.errorService.showErrorMessage(error);
        }
      );
  }
}
