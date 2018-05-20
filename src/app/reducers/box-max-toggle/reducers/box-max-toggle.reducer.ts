import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import {BoxMaxToggle} from '../models/box-max-toggle.model';
import {BoxMaxToggleActions, BoxMaxToggleActionTypes} from '../actions/box-max-toggle.actions';

export interface State extends EntityState<BoxMaxToggle> {
	// additional entities state properties
}

export const adapter: EntityAdapter<BoxMaxToggle> = createEntityAdapter<BoxMaxToggle>();

export const initialState: State = adapter.getInitialState({
	ids     : ['boxMaxToggle'],
	entities: {
		'boxMaxToggle': {
			id   : 'boxMaxToggle',
			value: false,
		},
	},
});

export function boxMaxToggleReducer(
	state = initialState,
	action: BoxMaxToggleActions,
): State {
	switch (action.type) {

		case BoxMaxToggleActionTypes.UpdateBoxMaxToggle: {
			return adapter.updateOne(action.payload.boxMaxToggle, state);
		}

		default: {
			return state;
		}
	}
}

export const getBoxMaxToggleState = createFeatureSelector<State>('boxMaxToggle'); // geno

export const {
				 selectIds,
				 selectEntities,
				 selectAll,
				 selectTotal,
			 } = adapter.getSelectors(getBoxMaxToggleState);
