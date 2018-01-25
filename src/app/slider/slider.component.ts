import { 
	Component, 
	OnInit, 
	AfterViewInit,
	Output,
	EventEmitter
	//ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TimelineMax, TweenMax } from "gsap";
//import { DOMEvents } from '../shared/DOMEvents.service'
import { sliderTransition } from '../shared/slider-transition.animations';

import { ProjectService } from '../projects/project.service';
import { IProject } from '../projects/project';
declare module "gsap" {
	export interface TweenConfig {
	  [p: string]: any;
	}
  } 

@Component({
	moduleId: module.id,
	selector: 'slider-component',
	templateUrl: 'slider.component.html',
	styleUrls: ['slider.component.sass'],
	animations: [ sliderTransition ],
	host: {
		'(document:keydown)': 'onKeydown($event)',
		'[@sliderTransition]': ''
    }

})
export class SliderComponent implements OnInit { 

	//@Output() appReadyEvent = new EventEmitter()

	slides: IProject[]
	errorMessage: string
	activeProject: number = 0
	isMoving: boolean = false
	winHeight: number = window.innerHeight
	winWidth: number = window.innerWidth
	tl = new TimelineMax
	images= new Array
	initialLoad: boolean = false



	constructor(//private _projectService: ProjectService,
				private _route: ActivatedRoute,
				private _router: Router,
				//public _domEvents: DOMEvents
			){}

	ngOnInit(): void {
		/*this._projectService.getProjects()
							.subscribe(
								slides => this.slides = slides,
								error => this.errorMessage = <any>error
							);*/
		/*this._route.data.subscribe (
						  data => this.slides = data['slides'])*/

		this.slides = this._route.snapshot.data['projects']
		this.slides[this.activeProject]['active'] = true	
		/*if (this.slides){
			if (this.initialLoad === false){
				setTimeout(()=>{
					//this._domEvents.triggerOnDocument("appready")
					console.log('Initial load..')
				}, 4500)
				
			}
		}*/
	}

	ngAfterViewInit(){
		TweenMax.set('.project-hero', { y: this.winHeight, visibility: 'visible'})
		TweenMax.set('#project' + this.activeProject, { y:0, visibility: 'visible'})
		TweenMax.set('#projTitle' + this.activeProject, {y:0, visibility: 'visible'})
	}

	//Mousewheel navigation using Mousewheel directive
	mouseWheelUpFunc(){
		if (!this.isMoving){
			this.navigate('next', false)
		}
	}
	
	mouseWheelDownFunc(){
		if (!this.isMoving){
			this.navigate('prev', false)
		}
	}

	//Navigates to next or previous project using keyboard arrow keys
	private onKeydown(event: KeyboardEvent) {
        let prevent = [38, 40]
            .find(no => no === event.keyCode)
        if (prevent) {
            event.preventDefault()
        }

        switch (prevent) {
            case 38:
                // navigate left
                this.navigate('prev', false)
                break
            case 40:
                // navigate right
                this.navigate('next', false)
                break
        }
    }
	
	//Navigates to next or previous project
	public navigate(direction: string, swipe?: any) {
		let currProject = '#project'+(this.activeProject)
		let currTitle = '#title'+(this.activeProject)
		let currSubtitle = '#subtitle'+(this.activeProject)
		
		if ((direction === 'next' && this.activeProject < this.slides.length - 1) ||
			(direction === 'prev' && this.activeProject >0)) {
				if (direction == 'prev') {
					this.slide(currProject, currTitle, currSubtitle, (this.activeProject - 1), -100, 100)
				}
				else {
					this.slide(currProject, currTitle, currSubtitle, (this.activeProject + 1), 100, -100)
				}
				this.updateImage()
			}
			else {
				if (this.activeProject === 0) {
					this.slide(currProject, currTitle, currSubtitle, (this.slide.length - 1), -100, 100)
					
				}
				else {
					this.slide(currProject, currTitle, currSubtitle, 0, 100, -100)
				}
				this.updateImage()
			}
	}

	//Navigates to specific project designated by indicators
	private navigateToProj(indicatorIndex: number) {
		let currProject = '#project'+(this.activeProject)
		let currTitle = '#title'+(this.activeProject)
		let currSubtitle = '#subtitle'+(this.activeProject)
		if (indicatorIndex != this.activeProject) {
			if (indicatorIndex > this.activeProject) {
				this.slide(currProject, currTitle, currSubtitle, indicatorIndex, 100, -100)
			} 
			else {
				this.slide(currProject, currTitle, currSubtitle, indicatorIndex, -100, 100)
			}
			this.updateImage()
		}
	}

	//Slide current project out and new project in
	slide(currProject: any, currTitle: any, currSubtitle: any, id: number, slideFrom: number, slideTo: number){
		let newProject = '#project' + id
		let newTitle = '#title' + id
		let newSubtitle = '#subtitle' + id
		console.log(2 * slideFrom)
		this.tl
			.set(newProject, {y:(2 * slideFrom), autoAlpha: 0})
			.set(newTitle, {y:slideFrom, autoAlpha: 0} )
			.set(newSubtitle, {y:slideFrom, autoAlpha: 0} )
		if (slideFrom > 0 ){
			this.tl
				.to(currTitle, .5, {y: slideTo, autoAlpha: 0, ease:'Power2.easeIn', onStart: this.animStart() })
				.to(currSubtitle, .5, {y: slideTo, autoAlpha: 0, ease:'Power2.easeIn'}, '-=.35')
				.to(currProject, .5, {y: (2 * slideTo), autoAlpha: 0, ease:'Power2.easeIn' })
				.to(newProject, .5, {y: 0 , autoAlpha: 1, ease:'Power2.easeOut'},'-=.25')
				.to(newTitle, .5, {y: 0 , autoAlpha: 1, ease:'Power2.easeOut'},'-=.15')
				.to(newSubtitle, .5, {y: 0 , autoAlpha: 1, ease:'Power2.easeOut', onComplete: this.animDone() },'-=.35')
		} else {
			this.tl
				.to(currSubtitle, .5, {y: slideTo, autoAlpha: 0, ease:'Power2.easeIn', onStart: this.animStart() })
				.to(currTitle, .5, {y: slideTo, autoAlpha: 0, ease:'Power2.easeIn'}, '-=.35')
				.to(currProject, .5, {y: (2 * slideTo), autoAlpha: 0, ease:'Power2.easeIn' })
				.to(newProject, .5, {y: 0 , autoAlpha: 1, ease:'Power2.easeOut'},'-=.25')
				.to(newSubtitle, .5, {y: 0 , autoAlpha: 1, ease:'Power2.easeOut'},'-=.15')
				.to(newTitle, .5, {y: 0 , autoAlpha: 1, ease:'Power2.easeOut', onComplete: this.animDone() },'-=.35')
		}
		this.activeProject = id
	}

	//Update image on screen resize
	public onResize() {
			this.slides.forEach((slide) => {
				slide['active'] = false
			})
			this.updateImage()
	}

	//Updates active project
	private updateImage() {
		//Wait for animation to end
		setTimeout(() => {
			this.slides[this.activeProject]['active'] = true
			this.slides.forEach((slide) => {
				if (slide != this.slides[this.activeProject]) {
					slide['active'] = false
				}
			})
			
		}, 900)
	}

	//Gets and assigns image dimensions and position
	/*getSliderImgDim(id:number) {
		let imgHeight = this.slides[id].thumbUrl.height
		let imgWidth = this.slides[id].thumbUrl.width
		let screenRatio = this.winHeight / this.winWidth
		let imgRatio = imgHeight / imgWidth
		
		if (screenRatio > imgRatio) {
			imgHeight = this.winHeight
			imgWidth = this.winHeight / imgRatio 
		} else {
			imgHeight = this.winWidth * imgRatio
			imgWidth = this.winWidth
		}
		let imgPosLeft = (this.winWidth - imgWidth) / 2
		let imgPosTop = (this.winHeight - imgHeight) / 2
		//console.log('width:' + imgWidth+'px', 'height:'+ imgHeight+'px', 'top:'+ imgPosTop+'px', 'left:'+ imgPosLeft+'px')		
		return {width: imgWidth+'px', height: imgHeight+'px', top: imgPosTop+'px', left: imgPosLeft+'px'}
	}*/
	
	//Adds delay to stop MacOSX inertia from triggering navigation
	animStart(){
		this.isMoving = true
	}

	animDone(){
		setTimeout(()=>{
			this.isMoving = false
		}, 900)
	}
}
