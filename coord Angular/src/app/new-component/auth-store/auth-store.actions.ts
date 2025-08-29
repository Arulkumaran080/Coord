import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN_AUTHSTORES = '[AuthStore] Login AuthStores',
  LOGIN_AUTHSTORES_SUCCESS = '[AuthStore] Login AuthStores Success',
  LOGIN_AUTHSTORES_FAILURE = '[AuthStore] Login AuthStores Failure',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN_AUTHSTORES;
  constructor(public email: string, public password: string) { }
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_AUTHSTORES_SUCCESS;
  constructor(public payload: any) { }
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_AUTHSTORES_FAILURE;
  constructor(public payload: any) { }
}

export type AuthActions = Login | LoginSuccess | LoginFailure;
