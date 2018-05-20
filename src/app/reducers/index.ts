import {
	ActionReducer,
	ActionReducerMap,
	createFeatureSelector,
	createSelector,
	MetaReducer,
} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {boxMaxToggleReducer} from './box-max-toggle/reducers/box-max-toggle.reducer';
import {boxRecordReducer} from './box-record-entity/reducers/box-record.reducer';

export interface State {
}

export const reducers: ActionReducerMap<State> = {
	'boxRecord'   : boxRecordReducer,
	'boxMaxToggle': boxMaxToggleReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
