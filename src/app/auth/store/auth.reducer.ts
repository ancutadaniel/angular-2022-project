import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
}

const initialState: State = {
  user: null,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActionsType
) {
  switch (action.type) {
    case AuthActions.LOGIN:
      console.log(action.type, action.payload);

      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user,
      };
    case AuthActions.LOGIN:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
