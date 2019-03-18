import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '@enums/AppState.enum';
import {selectActiveAppState} from '@store/selectors/app.selector';
import {ChangeActiveState} from '@store/actions/app.actions';

@Injectable()
export class StoreFacadeService {
  readonly activeAppState$ = this.store$.select<AppState>(selectActiveAppState);

  constructor(private store$: Store<any>) {
  }

  changeActiveState(appState: AppState) {
    this.store$.dispatch(new ChangeActiveState(appState));
  }
}
