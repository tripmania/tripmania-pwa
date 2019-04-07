import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {getAccessToken, getRefreshToken, removeTokens, setTokens} from '@shared/helpers/tokens.helpers';
import {catchError, filter, switchMap, tap} from 'rxjs/operators';
import {apiUrls} from '@consts/apiUrls.consts';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient,
              private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === `${apiUrls.USER_URL}/refresh`) {
      return this.doRequest(request, next);
    }

    return this.doRequest(request, next)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.makeRefresh(request, next);
          }

          return throwError(error);
        })
      );
  }

  private doRequest(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = getAccessToken();
    const newRequest = request.clone({headers: request.headers.set('Authorization', `Bearer ${accessToken}`)});

    return next.handle(newRequest);
  }

  private makeRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const refreshToken = getRefreshToken();

    return this.http.post(
      `${apiUrls.USER_URL}/refresh`,
      {refreshToken},
      {observe: 'response'}
    )
      .pipe(
        catchError(() => {
          removeTokens();
          this.router.navigate(['/auth/sign-in']);

          return of(null);
        }),
        filter(result => result !== null),
        tap((response: HttpResponse<{accessToken: string, refreshToken: string}>) => {
          setTokens(response.body.accessToken, response.body.refreshToken);
        }),
        switchMap(() => this.doRequest(request, next))
      );
  }
}
