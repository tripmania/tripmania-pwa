import {ActionReducerMap} from '@ngrx/store';
import {InjectionToken} from '@angular/core';
import {appReducer} from '@store/reducers/app.reducer';
import {userReducer} from '@store/reducers/user.reducer';
import {tripsReducer} from '@store/reducers/trips.reducer';

export const reducers: ActionReducerMap<any> = {
  // Change on APP_STATE
  appState: appReducer,
  userState: userReducer,
  tripsState: tripsReducer
};

// For AoT compatibility
export const reducersToken = new InjectionToken<ActionReducerMap<any>>('Reducers');

export const reducersProvider = [
  {provide: reducersToken, useValue: reducers}
];
