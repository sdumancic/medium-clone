import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {AuthService} from '../../services/auth.service';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {getCurrentUserAction, getCurrentUserFailureAction, getCurrentUserSuccessAction} from '../actions/getCurrentUser.action';
import {PersistenceService} from '../../../shared/services/persistence.service';


@Injectable()
export class GetCurrentUserEffect {

  constructor(private actions$: Actions,
              private authService: AuthService,
              private persistenceService: PersistenceService) {
  }

  // subscribing to actions, actually only to getCurrentUserAction
  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(getCurrentUserAction),
    switchMap(() => {
      const token = this.persistenceService.get('accessToken');
      if (!token) {
        return of(getCurrentUserFailureAction());
      }
      return this.authService.getCurrentUser().pipe(
        map((currentUser: CurrentUserInterface) => {
          return getCurrentUserSuccessAction({currentUser});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(getCurrentUserFailureAction());
        })
      );
    }
  )));


}
