import { Action } from "@ngrx/store";

export const LOGIN_START = "[Auth] Login Start";
export const LOGIN_FAILED = "[Auth] Login Failed";
export const LOGIN = "[Auth] Login";
export const LOGOUT = "[Auth] Logout";

export class Login implements Action {
  readonly type: string = LOGIN;
  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
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

export class LoginFail implements Action {
  readonly type: string = LOGIN_FAILED;
  constructor(public payload: string) {}
}

export type AuthActionsType = Login | Logout | LoginFail | LoginStart;