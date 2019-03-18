import {appStateInitial, IAppState} from '@store/states/app.state';
import {AppActions, AppActionTypes} from '@store/actions/app.actions';

export function appReducer(state: IAppState = appStateInitial,
                           action: AppActions): IAppState {
  switch (action.type) {
    case (AppActionTypes.CHANGE_ACTIVE_STATE):
      return {
        ...state,
        activeState: action.activeState
      };
    default:
      return state;
  }
}
