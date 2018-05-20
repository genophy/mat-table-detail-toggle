import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class HttpClientService {

	constructor(private httpClient: HttpClient) { }

	post(url: string, params: {}) {
		return this.httpClient.post(url, params);
	}
}
