import { Action } from "@ngrx/store";

export const LOGIN_START = "[Auth] Login Start";
export const AUTHENTICATED_FAILED = "[Auth] Login Failed";
export const AUTHENTICATED_SUCCESS = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";
export const SIGNUP_START = "[Auth] Signup Start";
export const CLEAR_ERROR = "[Auth] Clear Error";
export const AUTO_LOGIN = "[Auth] Auto Login";

export class AuthenticatedSuccess implements Action {
  readonly type: string = AUTHENTICATED_SUCCESS;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class Logout implements Action {
  readonly type: string = LOGOUT;
  constructor(public payload?: any) {}
}

export class LoginStart implements Action {
  readonly type: string = LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticatedFailed implements Action {
  readonly type: string = AUTHENTICATED_FAILED;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type: string = SIGNUP_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type: string = CLEAR_ERROR;
  constructor(public payload?: any) {}
}

export class AutoLogin implements Action {
  readonly type: string = AUTO_LOGIN;
  constructor(public payload?: any) {}
}

export type AuthActionsType =
  | AuthenticatedSuccess
  | Logout
  | AuthenticatedFailed
  | LoginStart
  | SignupStart
  | ClearError
  | AutoLogin;
