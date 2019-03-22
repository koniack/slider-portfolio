import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { TimelineMax, TweenMax } from 'gsap';
import { ProjectService } from './project.service';
import { IProject } from './project';
import { WindowDimensionsService } from '../shared/window-dimensions.service'
import { projectListTransition } from 'app/shared/project-list.animations';
import { forEach } from '@angular/router/src/utils/collection';



@Component({
	moduleId: module.id,
	selector: 'project-list',
	templateUrl: 'project-list.component.html',
	styleUrls: ['project-list.component.sass'],
	animations: [ projectListTransition ],
	host: {
		'[@projectListTransition]' : ''
	}

})
export class ProjectListComponent implements OnInit, AfterViewInit {
	@ViewChild('image') image: ElementRef;
	@ViewChildren('column') columns: QueryList<any>;

	listFilter: string;
	errorMessage: string;
	projects: IProject[];
	filterCategory: string[] = ['Branding', 'Web Design', 'Logo Design'];
	imgHeight = 100
	imgWidth: number
	winHeight: number;
	winWidth: number;
	easing: any = 'Power2.easeOut';
	col2Pos: number;

	constructor(private _projectService: ProjectService,
				private _route: ActivatedRoute,
				private _router: Router,
				public _windowDimensionsService: WindowDimensionsService){}

	ngOnInit(): void {
		this.winHeight = this._windowDimensionsService.winHeight
		this.winWidth = this._windowDimensionsService.winWidth
		if (this._route.snapshot.queryParams['filterBy'] === 'null'){
			this.listFilter = '';
		} else {
		this.listFilter = this._route.snapshot.queryParams['filterBy'] || '';
		}
		this.projects = this._route.snapshot.data['projects']
		this.col2Pos = this.imgHeight + 5; 

	}

	ngAfterViewInit(){
	}
	resizeProjectListContainer(){

	}
	onResize(){
		this.imgWidth = this.image.nativeElement.getBoundingClientRect().width;
		const screenRatio = this._windowDimensionsService.winHeight / this._windowDimensionsService.winWidth;
		this.imgHeight = this.imgWidth * screenRatio;
		this.winHeight = this._windowDimensionsService.winHeight;		
	}

	onNext(projectId): void {
		const tl = new TimelineMax;
		let columnArray = this.columns.toArray();

		for(let i = 0; i < columnArray.length; i++){
			if (i != projectId){
				tl.to(columnArray[i].nativeElement, .2, { autoAlpha: 0, ease: this.easing})
			}
		}
		tl.to('.card-content', .2, {opacity:0, ease: this.easing })
		.to('.image', .1, {'background-blend-mode': 'normal', 'background-color': 'transparent', ease: this.easing },'+=.0')

		
		.to(['.image' + projectId], .5, {width: this.winWidth + 'px', height: this.winHeight + 'px', "padding-top": 0,  ease: this.easing})
		.to(['.column' + projectId], .5, { top: '0', left: '0', width: this.winWidth + 'px', height: this.winHeight + 'px', ease: this.easing}, '-=1')	
		
		setTimeout(() => {
		  this._router.navigate([`/projects/${projectId + 1}`], { queryParams: {'project': projectId + 1}, queryParamsHandling: 'merge', fragment: 'top'});
		}, 2500)
	  }
}
