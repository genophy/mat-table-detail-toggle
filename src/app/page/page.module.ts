import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ComponentModule} from '../component/component.module';
import {SharedModule} from '../shared/shared.module';
import {ClassesComponent} from './classes/classes.component';
import {StudentComponent} from './classes/student/student.component';

const pages = [ClassesComponent, StudentComponent];

@NgModule({
	imports        : [
		CommonModule,
		ComponentModule,
		SharedModule,
		BrowserAnimationsModule,
	],
	declarations   : pages,
	exports        : pages,
	entryComponents: pages,
	providers      : [],
})
export class PageModule {}
