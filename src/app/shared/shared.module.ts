import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentsService} from '../service/students.service';
import {MaterialModule} from './material/material.module';
import {HttpClientService} from './public/http-client.service';

@NgModule({
	imports     : [
		CommonModule,
		MaterialModule,
		HttpClientModule,
	],
	declarations: [],
	exports     : [
		MaterialModule,
	],
	providers   : [StudentsService],
})
export class SharedModule {}
