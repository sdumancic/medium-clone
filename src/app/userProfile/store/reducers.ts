import {UserProfileStateInterface} from '../types/userProfileState.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {getUserProfileAction, getUserProfileFailureAction, getUserProfileSuccessAction} from './actions/getUserProfile.action';

const initialState: UserProfileStateInterface = {
  data: null,
  isLoading: false,
  error: null
};

const userProfileReducer = createReducer(initialState,
  on(
    getUserProfileAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getUserProfileSuccessAction,
    (state, payload): UserProfileStateInterface => ({
      ...state,
      isLoading: false,
      data: payload.userProfile
    })
  ),
  on(
    getUserProfileFailureAction,
    (state): UserProfileStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);

export function reducers (state: UserProfileStateInterface, action: Action) {
  return userProfileReducer(state, action);
}