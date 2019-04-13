import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable, of} from 'rxjs';
import {getAccessToken, getRefreshToken} from '@shared/helpers/tokens.helpers';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const access = getAccessToken();
    const refresh = getRefreshToken();

    if (!access || !refresh) {
      this.router.navigate(['/auth/sign-in'], {replaceUrl: true});
      return of(false);
    }

    return of(true);
  }
}
