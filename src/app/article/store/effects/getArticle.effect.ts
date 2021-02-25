import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from '../actions/getArticle.action';
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service';
import {ArticleInterface} from '../../../shared/types/article.interface';


@Injectable()
export class GetArticleEffect {

  constructor(private actions$: Actions,
              private sharedArticleService: SharedArticleService) {
  }

  getArticle$ = createEffect(() => this.actions$.pipe(
    ofType(getArticleAction),
    switchMap((props) => {
        return this.sharedArticleService.getArticle(props.slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article});
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getArticleFailureAction());
          })
        );
      }
    )));


}
