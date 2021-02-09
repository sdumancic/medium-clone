import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {PopularTagsService} from '../../services/popularTags.service';
import {getPopularTagsAction, getPopularTagsFailureAction, getPopularTagsSuccessAction} from '../actions/getPopularTags.action';
import {PopularTagType} from '../../../../types/popularTag.type';


@Injectable()
export class GetPopularTagsEffect {

  constructor(private actions$: Actions,
              private popularTagsService: PopularTagsService) {
  }

  getPopularTags$ = createEffect(() => this.actions$.pipe(
    ofType(getPopularTagsAction),
    switchMap((props) => {

        return this.popularTagsService.getPopularTags().pipe(
          map((popularTags: PopularTagType[]) => {
            return getPopularTagsSuccessAction({popularTags});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getPopularTagsFailureAction());
          })
        );
      }
    )));


}
