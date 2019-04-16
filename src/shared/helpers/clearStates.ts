import {UserActionsTypes} from '@store/actions/user.actions';

export function clearStates(reducer) {
  return function (state, action) {

    if (action.type === UserActionsTypes.LOGOUT) {
      state = undefined;
    }

    return reducer(state, action);
  };
}
