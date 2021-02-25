import {ArticleStateInterface} from '../types/articleState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from './actions/getArticle.action';
import {routerNavigatedAction, routerNavigationAction} from '@ngrx/router-store';

const initialState: ArticleStateInterface = {
  data: null,
  isLoading: false,
  error: null
};

const articleReducer = createReducer(
  initialState,
  on(getArticleAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(getArticleSuccessAction,
    (state, payload): ArticleStateInterface => ({
      ...state,
      isLoading: false,
      data: payload.article
    })
  ),
  on(getArticleFailureAction,
    (state): ArticleStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigationAction,
    (state): ArticleStateInterface => initialState )
);

export function reducers(state: ArticleStateInterface, action: Action): ArticleStateInterface {
  return articleReducer(state, action);
}
