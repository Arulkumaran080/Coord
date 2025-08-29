import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LoginService } from 'src/app/Services/login.service';
import { AuthActionTypes, Login, LoginFailure, LoginSuccess } from './auth-store.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemService } from 'src/app/Services/item.service';
import { AddItems } from '../store/action/items.actions';
import { Store } from '@ngrx/store';

export interface UserResponse {
  id: number;
  email: string;
  message: string;
  isValid: boolean;
}

@Injectable()
export class AuthEffects {


  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService,
    private itemService: ItemService,
    private store: Store
  ) { }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<Login>(AuthActionTypes.LOGIN_AUTHSTORES),
      mergeMap(({ email, password }) =>
        this.loginService.getUserAuthentication(email, password).pipe(
          map((res: UserResponse) => {
            if (res.isValid) {
              return new LoginSuccess({ id: res.id, email: res.email, message: res.message });
            } else {
              return new LoginFailure({ error: res.message });
            }
          }),
          catchError((error) => of(new LoginFailure({ error: error.message })))
        )
      )
    )
  });

  loginSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<LoginSuccess>(AuthActionTypes.LOGIN_AUTHSTORES_SUCCESS),
      mergeMap(({ payload }) => {
        if (payload) {
          sessionStorage.setItem("email", payload.email);
          sessionStorage.setItem("id", payload.id.toString());
          return this.itemService.getItemByIdBasedOnTabName('home', payload.id).pipe(
            map((items) => {
              this.store.dispatch(new AddItems({ items }));
              this.toastr.success('Login Successful', 'Welcome');
              this.router.navigate(['/home-page']);
              return items;
            })
          );
        }
        return of(null);
      })
    );
  }, { dispatch: false });

  loginFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType<LoginFailure>(AuthActionTypes.LOGIN_AUTHSTORES_FAILURE),
      mergeMap(async ({ }) => this.toastr.error('Invalid email or password', 'Login Failed')
      )
    );
  }, { dispatch: false });
}
