import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {DynamicLoaderService} from '@modules/dynamic-loader/dynamic-loader.service';
import {AddDynamicComponent, AppActionTypes, ChangeActiveState, GoToBackComponent} from '@store/actions/app.actions';
import {tap} from 'rxjs/operators';

@Injectable()
export class AppEffects {
  @Effect({dispatch: false})
  onChangeActiveState$ = this.actions$
    .pipe(
      ofType<ChangeActiveState>(AppActionTypes.CHANGE_ACTIVE_STATE),
      tap(() => this.dynamicLoaderService.removeAllDynamicComponents())
    );

  @Effect({dispatch: false})
  onAddDynamicComponent$ = this.actions$
    .pipe(
      ofType<AddDynamicComponent>(AppActionTypes.ADD_DYNAMIC_COMPONENT),
      tap(({component, inputs}) => this.dynamicLoaderService.addDynamicComponent(component, inputs))
    );

  @Effect({dispatch: false})
  handleGoToBackComponent$ = this.actions$
    .pipe(
      ofType<GoToBackComponent>(AppActionTypes.GO_TO_BACK_COMPONENT),
      tap(() => this.dynamicLoaderService.removeLastDynamicComponent())
    );

  constructor(private actions$: Actions,
              private store: Store<any>,
              private dynamicLoaderService: DynamicLoaderService) {
  }
}
