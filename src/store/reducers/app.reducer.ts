import {appStateInitial, IAppState} from '@store/states/app.state';
import {AppActions, AppActionTypes} from '@store/actions/app.actions';

export function appReducer(state: IAppState = appStateInitial,
                           action: AppActions): IAppState {
  let newDynamicState;
  let newStaticState;
  const dynamicStatesLen = state.dynamicStates.length;

  switch (action.type) {
    case (AppActionTypes.OPEN_STATIC_VIEW):
      return {
        ...state,
        activeStaticState: action.view,
        activeDynamicState: null,
        dynamicStates: []
      };

    case (AppActionTypes.OPEN_DYNAMIC_VIEW):
      action.view.componentIndex = !!state.activeDynamicState ? state.activeDynamicState.componentIndex + 1 : 1;

      return {
        ...state,
        activeDynamicState: action.view,
        dynamicStates: state.dynamicStates.concat(action.view)
      };

    case (AppActionTypes.GO_TO_BACK_VIEW):
      if (dynamicStatesLen === 0) {
        return state;
      }

      return {
        ...state,
        activeDynamicState: (dynamicStatesLen > 1 ? {...(state.dynamicStates[dynamicStatesLen - 2])} : null),
        dynamicStates: state.dynamicStates.slice(0, -1)
      };

    case (AppActionTypes.SET_HEADER_TITLE):
      if (dynamicStatesLen > 0) {
        newDynamicState = {
          ...(state.activeDynamicState),
          headerOptions: {
            ...(state.activeDynamicState.headerOptions),
            title: action.title
          }
        };

        return {
          ...state,
          activeDynamicState: {...newDynamicState},
          dynamicStates: state.dynamicStates.slice(0, -1).concat({...newDynamicState})
        };
      }

      newStaticState = {
        ...(state.activeStaticState),
        headerOptions: {
          ...(state.activeStaticState.headerOptions),
          title: action.title
        }
      };

      return {
        ...state,
        activeStaticState: {...newStaticState}
      };

    case (AppActionTypes.SET_HEADER_ACTION):
      if (dynamicStatesLen > 0) {
        newDynamicState = {
          ...(state.activeDynamicState),
          headerOptions: {
            ...(state.activeDynamicState.headerOptions),
            actionName: action.actionName,
            action: action.action,
            isIcon: action.isIcon
          }
        };

        return {
          ...state,
          activeDynamicState: {...newDynamicState},
          dynamicStates: state.dynamicStates.slice(0, -1).concat({...newDynamicState})
        };
      }

      newStaticState = {
        ...(state.activeStaticState),
        headerOptions: {
          ...(state.activeStaticState.headerOptions),
          actionName: action.actionName,
          action: action.action,
          isIcon: action.isIcon
        }
      };

      return {
        ...state,
        activeStaticState: {...newStaticState}
      };

    case (AppActionTypes.SET_HEADER_TRANSPARENT):
      if (dynamicStatesLen > 0) {
        newDynamicState = {
          ...(state.activeDynamicState),
          headerOptions: {
            ...(state.activeDynamicState.headerOptions),
            isTransparent: true
          }
        };

        return {
          ...state,
          activeDynamicState: {...newDynamicState},
          dynamicStates: state.dynamicStates.slice(0, -1).concat({...newDynamicState})
        };
      }

      newStaticState = {
        ...(state.activeStaticState),
        headerOptions: {
          ...(state.activeStaticState.headerOptions),
          isTransparent: true
        }
      };

      return {
        ...state,
        activeStaticState: {...newStaticState}
      };

    default:
      return state;
  }
}
