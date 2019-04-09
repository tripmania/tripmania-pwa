import {appStateInitial, IAppState} from '@store/states/app.state';
import {AppActions, AppActionTypes} from '@store/actions/app.actions';

export function appReducer(state: IAppState = appStateInitial,
                           action: AppActions): IAppState {
  switch (action.type) {
    case (AppActionTypes.CHANGE_STATIC_STATE):
      return {
        ...state,
        staticState: action.staticState,
        headerTitles: []
      };
    case (AppActionTypes.ADD_DYNAMIC_COMPONENT):
      return {
        ...state,
        headerTitles: state.headerTitles.concat(action.headerTitle)
      };
    case (AppActionTypes.GO_TO_BACK_COMPONENT):
      return {
        ...state,
        headerTitles: state.headerTitles.slice(0, -1)
      };
    default:
      return state;
  }
}
