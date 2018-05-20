import {EntityState, EntityAdapter, createEntityAdapter} from '@ngrx/entity';
import {createFeatureSelector} from '@ngrx/store';
import {BoxRecord} from '../models/box-record.model';
import {BoxRecordActions, BoxRecordActionTypes} from '../actions/box-record.actions';

export interface State extends EntityState<BoxRecord> {
	// additional entities state properties
}

export const adapter: EntityAdapter<BoxRecord> = createEntityAdapter<BoxRecord>();

export const initialState: State = adapter.getInitialState({
	ids     : ['boxRecord'],
	entities: {
		'boxRecord': {
			id             : 'boxRecord',
			recordPageIdx  : 0,
			recordPageSize : 10,
			recordSelectIdx: 0,
			recordTotal    : 10,
			recordItem     : null,
		},
	},

});

export function boxRecordReducer(
	state = initialState,
	action: BoxRecordActions,
): State {
	switch (action.type) {

		case BoxRecordActionTypes.UpdateBoxRecord: {
			return adapter.updateOne(action.payload.boxRecord, state);
		}

		default: {
			return state;
		}
	}
}

export const getBoxRecordState = createFeatureSelector<State>('boxRecord'); // geno
export const {
				 selectIds,
				 selectEntities,
				 selectAll,
				 selectTotal,
			 } = adapter.getSelectors(getBoxRecordState);
