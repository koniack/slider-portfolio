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
	winHeight: number = window.innerHeight;
	easing: any = 'Power2.easeOut';

	constructor(private _projectService: ProjectService,
				private _route: ActivatedRoute,
				private _router: Router,
				public _windowDimensionsService: WindowDimensionsService){}

	ngOnInit(): void {

		if (this._route.snapshot.queryParams['filterBy'] === 'null'){
			this.listFilter = '';
		} else {
		this.listFilter = this._route.snapshot.queryParams['filterBy'] || '';
		}
		/*this._projectService.getProjects()
							.subscribe(
								projects => this.projects = projects,
								error => this.errorMessage = <any>error)*/
		/*this._route.data.subscribe (
						  data => this.projects = data['projects'])*/
		this.projects = this._route.snapshot.data['projects']

	}

	ngAfterViewInit(){
		this.onResize()
	}
	resizeProjectListContainer(){

	}
	onResize(){
		this.imgWidth = this.image.nativeElement.getBoundingClientRect().width;
		const screenRatio = this._windowDimensionsService.winHeight / this._windowDimensionsService.winWidth;
		this.imgHeight = this.imgWidth * screenRatio;
		console.log('image height: ' + this.imgHeight);
		this.winHeight = window.innerHeight;
		console.log('window height: ' + this.winHeight);
	}

	onNext(projectId): void {
		
		const tl = new TimelineMax;
		let columnArray = this.columns.toArray();

		for(let i = 0; i < columnArray.length; i++){
			if (i != projectId){
				tl.to(columnArray[i].nativeElement, .2, { autoAlpha: 0, ease: this.easing})
				console.log('remove ' + columnArray[i] );
			}
		}
		//tl.to(['.project-list-container', '.projects'], .5, {padding: 0, margin:0, ease: this.easing }, '+=.5')
		/*for(let i = 0; i < columnArray.length; i++){
			if (i != projectId){
				tl.to(columnArray[i].nativeElement, .0, {height: 0, width: 0, ease: this.easing})
				console.log('remove ' + columnArray[i] );
			}
		}
		/*this.columns.toArray().forEach( function(column){
			if (column === projectId){
				return;
			} else {
				tl.to(column.nativeElement, .4, {autoAlpha: 0, ease: 'Power2.easeOut'});
				console.log('remove ' + column.nativeElement + ' + ');
				}
			}
				

		)*/
	
		// TweenMax.set('scrollmagic-pin-spacer', {visibilty: 'hidden', height: 0 });
		tl.to([ '.card-content', '.image::before'], .4, {opacity:0, ease: this.easing })
		.to([ '.image'], .1, {'background-blend-mode': 'normal', 'background-color': 'transparent', ease: this.easing },'+=.2')
		//.to(['.column' + projectId], .8, { position: 'absolute',  ease: this.easing}, '-=.0')


		.to(['.column' + projectId], .5, {width: window.innerWidth + 'px', height: this.winHeight + 'px',  ease: this.easing}, '-=.0')
		.to(['.image' + projectId], .5, {width: window.innerWidth + 'px', height: this.winHeight + 'px',  ease: this.easing}, '-=.0')
		.to(['.column' + projectId], .5, { top: '0', left: '0',  ease: this.easing}, '-=1.2')

		//.to(['.column'], .5, {height: 0, width: 0, padding: 0, margin:0, ease: this.easing }, '-=.8')
		
		// window.scrollTo(0, 0);
	
		
		console.log('project id: ' + projectId);
		setTimeout(() => {
		  // tslint:disable-next-line:max-line-length
		  this._router.navigate([`/projects/${projectId + 1}`], { queryParams: {'project': projectId + 1}, queryParamsHandling: 'merge', fragment: 'top'});
		}, 3000)
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
