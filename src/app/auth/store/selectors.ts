import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/appState.interface';
import {AuthStateInterface} from '../types/authState.interface';

/* AppStateInterface = global state */
/*  AuthStateInterface = state from global state that we want */
export const authFeatureSelector = createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');

export const isSubmittingSelector = createSelector(authFeatureSelector, (authState: AuthStateInterface) => authState.isSubmitting);
