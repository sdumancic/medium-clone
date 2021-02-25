import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AddToFavoritesService} from '../../services/addToFavorites.service';
import {addToFavoritesAction, addToFavoritesFailureAction, addToFavoritesSuccessAction} from '../actions/addToFavorites.action';
import {ArticleInterface} from '../../../../types/article.interface';


@Injectable()
export class AddToFavoritesEffect {

  constructor(private actions$: Actions,
              private addToFavoriteService: AddToFavoritesService) {
  }

  getFeed$ = createEffect(() => this.actions$.pipe(
    ofType(addToFavoritesAction),
    switchMap((props) => {
      const article$ = props.isFavorited ?
        this.addToFavoriteService.removeFromFavorites(props.slug) :
        this.addToFavoriteService.addToFavorites(props.slug);
      return article$.pipe(
        map((article: ArticleInterface) => {
          return addToFavoritesSuccessAction({article});
        }),
        catchError((errorResponse: HttpErrorResponse) => {
          return of(addToFavoritesFailureAction());
        })
      );
    }
    )));


}
