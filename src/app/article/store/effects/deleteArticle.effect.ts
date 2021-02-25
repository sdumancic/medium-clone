import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {ArticleService} from '../../services/article.service';
import {deleteArticleAction, deleteArticleFailureAction, deleteArticleSuccessAction} from '../actions/deleteArticle.action';
import {Router} from '@angular/router';


@Injectable()
export class DeleteArticleEffect {

  constructor(private actions$: Actions,
              private articleService: ArticleService,
              private router: Router) {
  }

  deleteArticle$ = createEffect(() => this.actions$.pipe(
    ofType(deleteArticleAction),
    switchMap((props) => {
        return this.articleService.deleteArticle(props.slug).pipe(
          map(() => {
            return deleteArticleSuccessAction();
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(deleteArticleFailureAction());
          })
        );
      }
    )));

  redirectAfterDelete$ = createEffect(
    () => this.actions$.pipe(
        ofType(deleteArticleSuccessAction),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    {dispatch: false}
  );

}
