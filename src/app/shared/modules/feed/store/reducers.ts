import {FeedStateInterface} from '../types/feedState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {getFeedAction, getFeedFailureAction, getFeedSuccessAction} from './actions/getFeed.action';
import {routerNavigatedAction, routerNavigationAction} from '@ngrx/router-store';

const initialState: FeedStateInterface = {
  data: null,
  isLoading: false,
  error: null
};

const feedReducer = createReducer(
  initialState,
  on(getFeedAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(getFeedSuccessAction,
    (state, payload): FeedStateInterface => ({
      ...state,
      isLoading: false,
      data: payload.feed
    })
  ),
  on(getFeedFailureAction,
    (state): FeedStateInterface => ({
      ...state,
      isLoading: false
    })
  ),
  on(routerNavigationAction,
    (state): FeedStateInterface => initialState )
);

export function reducers(state: FeedStateInterface, action: Action): FeedStateInterface {
  return feedReducer(state, action);
}
