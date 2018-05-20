import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Store} from '@ngrx/store';
import {merge} from 'rxjs/internal/observable/merge';
import {UpdateBoxRecord} from '../../reducers/box-record-entity/actions/box-record.actions';
import * as fromBoxMaxToggle from '../../reducers/box-max-toggle/reducers/box-max-toggle.reducer';
import * as fromBoxRecord from '../../reducers/box-record-entity/reducers/box-record.reducer';
import {StudentsService} from '../../service/students.service';

@Component({
	selector   : 'app-classes',
	templateUrl: './classes.component.html',
	styleUrls  : ['./classes.component.scss'],
})
export class ClassesComponent implements OnInit, AfterViewInit {
	displayedColumns = ['name', 'age', 'score', 'code'];
	dataSource = new MatTableDataSource();
	studentSelected;
	boxMaxFlag = false; // 隐藏list
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private studentsService: StudentsService, private store: Store<any>) { }

	ngOnInit() {
		// boxRecord
		this.store.select(fromBoxRecord.selectAll).subscribe(value => {
			if (value && value[0] && value[0] ['recordItem']) {
				const item = value[0];
				//  若页码改变，则重新查询
				if (item.recordPageIdx !== this.paginator.pageIndex) {
					this.paginator.pageIndex = item.recordPageIdx;
					this._fillStudent(this.paginator.pageIndex, this.paginator.pageSize).then(data => {
						// 否则切换
						this.selectStudent(item['recordSelectIdx'], false);
					});
				} else {
					// 否则切换
					this.selectStudent(item['recordSelectIdx'], false);
				}

			}
		});

		// boxMaxTogle
		this.store.select(fromBoxMaxToggle.selectAll).subscribe(value => {
			if (value && value[0] && undefined !== value[0]['value']) {
				this.boxMaxFlag = <boolean>value[0]['value'];
			}
		});
	}

	ngAfterViewInit() {
		this._fillStudent(this.paginator.pageIndex, this.paginator.pageSize);
		// 当页数改变，则查询
		merge(this.paginator.page).subscribe(() => {
			// pageIdx默认从0开始
			this._fillStudent(this.paginator.pageIndex, this.paginator.pageSize);
		});

	}

	selectStudent(idx, dispathFlag: boolean = true) {
		const student = this.dataSource.data[idx];
		this.studentSelected = student;
		if (dispathFlag) {
			this.store.dispatch(new UpdateBoxRecord({
				boxRecord: {
					id     : 'boxRecord',
					changes: {
						recordPageIdx  : this.paginator.pageIndex,
						recordPageSize : this.paginator.pageSize,
						recordTotal    : this.paginator.length,
						recordSelectIdx: idx,
						recordItem     : student,
					},
				},

			}));
		}

	}

	/**
	 * 填充学生记录表
	 * @param {number} pageIdx 第几页，从0开始
	 * @param {number} pageSize 每页记录数
	 * @private
	 */
	private _fillStudent(pageIdx: number, pageSize: number) {
		return new Promise(resolve => {
			this.studentsService.queryStudents(
				pageIdx, pageSize).subscribe(value => {
				this.dataSource.data = <any[]>value;
				resolve(<any[]>value);
			});
		});

	}

}
