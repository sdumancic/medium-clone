import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';

import {UserProfileService} from '../../services/userProfile.service';
import {getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction} from '../actions/getUserProfile.action';
import {UserProfileInterface} from '../../types/userProfile.interface';


@Injectable()
export class GetUserProfileEffect {

  constructor(private actions$: Actions,
              private userProfileService: UserProfileService) {
  }

  getUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(getUserProfileAction),
    switchMap(({slug}) => {
        return this.userProfileService.getUserProfile(slug).pipe(
          map((userProfile: UserProfileInterface) => {
            return getUserProfileSuccessAction({userProfile});
          }),
          catchError(() => {
            return of(getUserProfileFailureAction());
          })
        );
      }
    )
  ));

}
