import {IUserState, userStateInitial} from '@store/states/user.state';
import {UserActions, UserActionsTypes} from '@store/actions/user.actions';

export function userReducer(state: IUserState = userStateInitial,
                            action: UserActions): IUserState {
  switch (action.type) {
    case UserActionsTypes.SET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
}
