import {Injectable} from '@angular/core';
import {HttpClientService} from '../shared/public/http-client.service';

@Injectable({
	providedIn: 'root',
})
export class StudentsService {

	constructor(private httpClientService: HttpClientService) {

	}

	/**
	 * 查询学生
	 * @param {number} pageIdx 第几页 0 -->
	 * @param {number} pageSize 每页记录
	 */
	queryStudents(pageIdx: number, pageSize: number) {

		return this.httpClientService.post('/lapi/getStudents', {
			pageIdx : pageIdx,
			pageSize: pageSize,
		});
	}
}
