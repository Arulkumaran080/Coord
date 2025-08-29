import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { CurrentUser } from 'src/app/Models/user';
import { AuthActionTypes, AuthActions } from './auth-store.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: any | null;
  error: string | null;
  loading: boolean;
}

export const initialState: AuthState = {
  user: null,
  error: null,
  loading: false
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_AUTHSTORES:
      return {
        ...state,
        loading: true,
        error: null
      }

    case AuthActionTypes.LOGIN_AUTHSTORES_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null
      }

    case AuthActionTypes.LOGIN_AUTHSTORES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error
      }

    default:
      return state;
  }
}

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectUser = createSelector(selectAuthState, state => {
  return state && state.user;
})

export const selectError = createSelector(selectAuthState, state => {
  return state && state.error;
})

export const seleteLoading = createSelector(selectAuthState, state => {
  return state && state.loading;
})
