import {CreateArticleStateInterface} from '../types/createArticleState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {createArticleAction, createArticleFailureAction, createArticleSuccessAction} from './actions/createArticle.action';

const initialState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null
}

const createArticleReducer = createReducer(
  initialState,

  on(
    createArticleAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),

  on(
    createArticleSuccessAction,
    (state): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),

  on(
    createArticleFailureAction,
    (state, payload): CreateArticleStateInterface => ({
      ...state,
      isSubmitting: false,
      validationErrors: payload.errors
    })
  )
)

export function reducers(state: CreateArticleStateInterface, action: Action){
  return createArticleReducer(state, action);
}
