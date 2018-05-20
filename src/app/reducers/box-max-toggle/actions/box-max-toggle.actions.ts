import {Action} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {BoxMaxToggle} from '../models/box-max-toggle.model';

export enum BoxMaxToggleActionTypes {
	UpdateBoxMaxToggle = '[BoxMaxToggle] Update BoxMaxToggle',
}

export class UpdateBoxMaxToggle implements Action {
	readonly type = BoxMaxToggleActionTypes.UpdateBoxMaxToggle;

	constructor(public payload: { boxMaxToggle: Update<BoxMaxToggle> }) {}
}

export type BoxMaxToggleActions = UpdateBoxMaxToggle;
