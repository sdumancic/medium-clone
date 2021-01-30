import {createAction, props} from '@ngrx/store';
import {ActionTypes} from './actionTypes';
import {RegisterRequestInterface} from '../../types/registerRequest.interface';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';

export const registerAction = createAction(
  ActionTypes.REGISTER,
  props<{request: RegisterRequestInterface}>()
);

/*props is what we dispatch after action
* */
export const registerSuccessAction = createAction(
  ActionTypes.REGISTER_SUCCESS,
  props<{currentUser: CurrentUserInterface}>()
);

export const registerFailureAction = createAction(
  ActionTypes.REGISTER_FAILURE
);