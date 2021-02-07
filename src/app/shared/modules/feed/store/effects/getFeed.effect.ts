import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from '../actions/getFeed.action';
import {FeedService} from '../../services/feed.service';
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface';


@Injectable()
export class GetFeedEffect {

  constructor(private actions$: Actions,
              private feedService: FeedService) {
  }

  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(getFeedAction),
    switchMap((props) => {
        return this.feedService.getFeed(props.url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getFeedFailureAction());
          })
        );
      }
    )));


}
