import {PopularTagsStateInterface} from '../types/popularTagsState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {getPopularTagsAction, getPopularTagsSuccessAction} from './actions/getPopularTags.action';


const initialState: PopularTagsStateInterface = {
  data: null,
  isLoading: false,
  error: null
}

const popularTagsReducer = createReducer(
  initialState,
  on(getPopularTagsAction, (state): PopularTagsStateInterface => ({
    ...state,
    isLoading: true
  })
  ),
  on(getPopularTagsSuccessAction, (state, payload): PopularTagsStateInterface => ({
    ...state,
    isLoading: false,
    data: payload.popularTags
  })
  ),
  on(getPopularTagsAction, (state): PopularTagsStateInterface => ({
    ...state,
    isLoading: false
  })
  )
);

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action);
}
