import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {BoxRecord} from '../models/box-record.model';

export enum BoxRecordActionTypes {
	UpdateBoxRecord = '[BoxRecord] Update BoxRecord',
}

export class UpdateBoxRecord implements Action {
	readonly type = BoxRecordActionTypes.UpdateBoxRecord;

	constructor(public payload: { boxRecord: Update<BoxRecord> }) {}
}

export type BoxRecordActions = UpdateBoxRecord;
