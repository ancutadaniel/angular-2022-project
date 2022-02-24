import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: "",
  loading: false,
};

export function authReducer(
  state: State = initialState,
  action: AuthActions.AuthActionsType
) {
  switch (action.type) {
    case AuthActions.AUTHENTICATED_SUCCESS:
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
        authError: null,
        loading: false,
      };

    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
      };

    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      console.log(action.type, action.payload);
      return {
        ...state,
        authError: null,
        loading: true,
      };

    case AuthActions.AUTHENTICATED_FAILED:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR: {
      return {
        ...state,
        authError: null,
      };
    }
    default:
      return state;
  }
}
