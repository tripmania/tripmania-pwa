import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';
import {tap} from 'rxjs/operators';
import {
  AppActionTypes, GoToBackView,
  OpenDynamicView,
  OpenStaticView
} from '@store/actions/app.actions';
import {StaticLoaderService} from '@modules/static-loader/static-loader.service';

@Injectable()
export class AppEffects {
  @Effect({dispatch: false})
  onChangeActiveState$ = this.actions$
    .pipe(
      ofType<OpenStaticView>(AppActionTypes.OPEN_STATIC_VIEW),
      tap(action => {
        StaticLoaderService.SetCurrentComponentName(action.view.componentName);
        this.dynamicLoaderService.removeAllDynamicComponents();
      })
    );

  @Effect({dispatch: false})
  onAddDynamicComponent$ = this.actions$
    .pipe(
      ofType<OpenDynamicView>(AppActionTypes.OPEN_DYNAMIC_VIEW),
      tap(action => this.dynamicLoaderService.addDynamicComponent(action.component, action.view.inputs))
    );

  @Effect({dispatch: false})
  handleGoToBackComponent$ = this.actions$
    .pipe(
      ofType<GoToBackView>(AppActionTypes.GO_TO_BACK_VIEW),
      tap(() => this.dynamicLoaderService.removeLastDynamicComponent())
    );

  constructor(private actions$: Actions,
              private dynamicLoaderService: DynamicLoaderService) {
  }
}
