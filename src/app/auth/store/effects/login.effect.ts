import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {AuthService} from '../../services/auth.service';
import {PersistenceService} from '../../../shared/services/persistence.service';
import {Router} from '@angular/router';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {HttpErrorResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {loginAction, loginFailureAction, loginSuccessAction} from '../actions/login.action';

@Injectable()
export class LoginEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private persistenceService: PersistenceService,
              private router: Router) {
  }


  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginAction),
    switchMap(({request}) => {
        return this.authService.login(request).pipe(
          map((currentUser: CurrentUserInterface) => {
            this.persistenceService.set('accessToken', currentUser.token);
            return loginSuccessAction({currentUser});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(loginFailureAction({errors: errorResponse.error.errors}));
          })
        );
      }
    )
  ));

  redirectAfterLogin$ = createEffect(
    () => this.actions$.pipe(
      ofType(loginSuccessAction),
      tap(() => {
        this.router.navigateByUrl('/');
      })
    ),
    {dispatch: false}
  );

}
