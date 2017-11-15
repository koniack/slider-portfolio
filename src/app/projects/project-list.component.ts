import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ProjectService } from './project.service';
import { IProject } from './project';
import { WindowDimensionsService } from '../shared/window-dimensions.service'



@Component({
	moduleId: module.id,
	selector: 'project-list',
	templateUrl: 'project-list.component.html',
	styleUrls: ['project-list.component.sass'],

})
export class ProjectListComponent implements OnInit {
	@ViewChild('image') image:ElementRef

	listFilter: string;
	errorMessage: string;
	projects: IProject[];
	filterCategory: string[] = ['Branding','Web Design','Logo Design'];
	imgHeight: number = 100
	imgWidth: number

	constructor(private _projectService: ProjectService,
				private _route: ActivatedRoute,
				private _windowDimensionsService: WindowDimensionsService){}

	ngOnInit(): void {
		if (this._route.snapshot.queryParams['filterBy'] == 'null'){
			this.listFilter = '';
		} else {
		this.listFilter = this._route.snapshot.queryParams['filterBy'] || '';
		}
		/*this._projectService.getProjects()
							.subscribe(
								projects => this.projects = projects,
								error => this.errorMessage = <any>error);*/
		this._route.data.subscribe (
      					data => this.projects = data['projects']);

	}

	ngAfterViewInit(){
		this.onResize()
	}

	onResize(){
		this.imgWidth = this.image.nativeElement.getBoundingClientRect().width
		let screenRatio = this._windowDimensionsService.winHeight / this._windowDimensionsService.winWidth
		this.imgHeight = this.imgWidth * screenRatio
		console.log('image height: ' + this.imgHeight)
	}
	/*getProjHeight(){
		console.log(this.image.nativeElement.getBoundingClientRect().width)
		let imgWidth = this.image.nativeElement.getBoundingClientRect().width
		let screenRatio = this._windowDimensionsService.winHeight / this._windowDimensionsService.winWidth
		let imgHeight = imgWidth * screenRatio
		console.log(`#image: ` + this.imgHeight + ' '+
					imgWidth+ 'imgWidth')
		return(imgHeight + 'px')
	}*/
}
