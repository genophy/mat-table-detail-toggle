import {Component, Input, OnInit, HostListener} from '@angular/core';
import {Store} from '@ngrx/store';
import {UpdateBoxMaxToggle} from '../../../reducers/box-max-toggle/actions/box-max-toggle.actions';
import {UpdateBoxRecord} from '../../../reducers/box-record-entity/actions/box-record.actions';
import {BoxRecord} from '../../../reducers/box-record-entity/models/box-record.model';
import * as fromBoxRecord from '../../../reducers/box-record-entity/reducers/box-record.reducer';
import * as fromBoxMaxToggle from '../../../reducers/box-max-toggle/reducers/box-max-toggle.reducer';

@Component({
	selector   : 'app-student',
	templateUrl: './student.component.html',
	styleUrls  : ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
	@Input() student = {};
	recordItem: BoxRecord;
	boxMaxFlag: boolean;
	recordSatusList = [];

	constructor(private store: Store<any>) {

	}

	@HostListener('window:keydown', ['$event'])
	keyboardInput(event: KeyboardEvent) {
		if (event.key === 'ArrowLeft') { //  左移向前查看
			if (this.recordItem.recordSelectIdx > 0) { // 若当前还有数据，则继续查看
				this.recordItem.recordSelectIdx--;  // 页码-1
				this._sendDispatchForBoxRecord();
				return false;
			} else if (this.recordItem.recordPageIdx > 0) { // 若当前数据查看完，并且还有上一页，则翻页
				this.recordItem.recordPageIdx--; // 页码-1
				this.recordItem.recordSelectIdx = this.recordItem.recordPageSize - 1; //  默认显示页最后一个
				this._sendDispatchForBoxRecord();
				return false;
			}
		} else if (event.key === 'ArrowRight') {  // 若当前还有数据，则继续查看
			if (this.recordItem.recordSelectIdx < this.recordItem.recordPageSize - 1) {
				this.recordItem.recordSelectIdx++; // 页码+1
				this._sendDispatchForBoxRecord();
				return false;
			} else if (this.recordItem.recordPageIdx < Math.floor(this.recordItem.recordTotal / this.recordItem.recordPageSize) +
				(this.recordItem.recordTotal % this.recordItem.recordPageSize === 0 ? -1 : 0)) {  // 若当前数据查看完，并且还有下一页，则翻页
				this.recordItem.recordPageIdx++;	// 页码+1
				this.recordItem.recordSelectIdx = 0; 	// 默认显示页第一个
				this._sendDispatchForBoxRecord();
				return false;
			}

		}
	}

	ngOnInit() {
		// boxRecord
		this.store.select(fromBoxRecord.selectAll).subscribe(value => {
			if (value && value[0] && value[0] ['recordItem']) {
				this.recordItem = value[0];
				this.recordSatusList = new Array(value[0]['recordPageSize']);
			} else {
				this.recordSatusList = [];
			}
		});

		// boxMaxTogle
		this.store.select(fromBoxMaxToggle.selectAll).subscribe(value => {
			if (value && value[0] && undefined !== value[0]['value']) {
				this.boxMaxFlag = <boolean>value[0]['value'];
			}
		});
	}

	selectRecordIdx(idx) {
		this.recordItem.recordSelectIdx = idx;
		this._sendDispatchForBoxRecord();
	}

	changeRecordPageIdx(idx) {
		this.recordItem.recordPageIdx = idx;
		this.recordItem.recordSelectIdx = 0;
		this._sendDispatchForBoxRecord();
	}

	toggleBoxMax() {
		this.boxMaxFlag = !this.boxMaxFlag;
		this.store.dispatch(new UpdateBoxMaxToggle({
			boxMaxToggle: {
				id     : 'boxMaxToggle',
				changes: {
					value: this.boxMaxFlag,
				},
			},
		}));
	}

	private _sendDispatchForBoxRecord() {
		this.store.dispatch(new UpdateBoxRecord({
			boxRecord: {
				id     : 'boxRecord',
				changes: this.recordItem,
			},
		}));
	}

}
