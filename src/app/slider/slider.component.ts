import {
	Component,
	OnInit,
	AfterViewInit,
	Output,
	EventEmitter
	// ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TimelineMax, TweenMax } from 'gsap';
import * as SplitText from 'gsap/SplitText';

// import { DOMEvents } from '../shared/DOMEvents.service'
import { sliderTransition } from '../shared/slider-transition.animations';

import { ProjectService } from '../projects/project.service';
import { IProject } from '../projects/project';
/*declare module "gsap" {
	export interface TweenConfig {
	  [p: string]: any;
	}
  } */

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
export class SliderComponent implements OnInit, AfterViewInit {

	// @Output() appReadyEvent = new EventEmitter()

	slides: IProject[]
	errorMessage: string
	activeProject: number
	isMoving = false
	winHeight: number = window.innerHeight
	winWidth: number = window.innerWidth
	
	images= new Array
	initialLoad = false
	easeIn = 'Power2.easeIn'
	easeOut = 'Power2.easeOut'


	constructor(// private _projectService: ProjectService,
				private _route: ActivatedRoute,
				private _router: Router,
				// public _domEvents: DOMEvents
			) {}

	ngOnInit(): void {
		/*this._projectService.getProjects()
							.subscribe(
								slides => this.slides = slides,
								error => this.errorMessage = <any>error
							);*/
		/*this._route.data.subscribe (
						  data => this.slides = data['slides'])*/

		this.slides = this._route.snapshot.data['projects']
		this.activeProject = +this._route.snapshot.queryParams['project'] || 1
		this.slides[this.activeProject - 1]['active'] = true
		console.log('this.activeProject = ' + this.activeProject)
		/*if (this.slides){
			if (this.initialLoad === false){
				setTimeout(()=>{
					//this._domEvents.triggerOnDocument("appready")
					console.log('Initial load..')
				}, 4500)

			}
		}*/
	}

	ngAfterViewInit() {
		TweenMax.set('.project-hero', { y: this.winHeight, visibility: 'visible'})
		TweenMax.set('#project-' + this.activeProject, { y: 0, visibility: 'visible'})
		TweenMax.set('#projTitle-' + this.activeProject, {y: 0, visibility: 'visible'})
	}

	// Mousewheel navigation using Mousewheel directive
	mouseWheelUpFunc() {
		if (!this.isMoving) {
			this.navigate('next', false)
		}
	}

	mouseWheelDownFunc() {
		if (!this.isMoving) {
			this.navigate('prev', false)
		}
	}

	// Navigates to next or previous project using keyboard arrow keys
	private onKeydown(event: KeyboardEvent) {
        const prevent = [38, 40]
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

	// Navigates to next or previous project
	public navigate(direction: string, swipe?: any) {
		if (!this.isMoving) {
			const currProject = '#project-' + (this.activeProject)
			const currTitle = '#title-' + (this.activeProject)
			const currSubtitle = '#subtitle-' + (this.activeProject)
			console.log('this.activeProject = ' + this.activeProject)
			console.log('this.slide.lentgh = ' + this.slide.length)
			console.log('this.slides.lentgh = ' + this.slides.length)

			if ((direction === 'next' && this.activeProject < this.slides.length) ||
				(direction === 'prev' && this.activeProject > 1)) {
					if (direction === 'prev') {
						this.slide(currProject, currTitle, currSubtitle, (this.activeProject - 1), -300, 300)
					}
					else {
						this.slide(currProject, currTitle, currSubtitle, (this.activeProject + 1), 300, -300)
					}
					this.updateImage()
				}
				else {
					if (this.activeProject === 1) {
						this.slide(currProject, currTitle, currSubtitle, (this.slides.length), -300, 300)

					}
					else {
						this.slide(currProject, currTitle, currSubtitle, 1, 300, -300)
					}
					this.updateImage()
				}
		}
	}

	// Navigates to specific project designated by indicators
	private navigateToProj(indicatorIndex: number) {
		if (!this.isMoving) {
			const nextProject = (indicatorIndex + 1)
			const currProject = '#project-' + (this.activeProject)
			const currTitle = '#title-' + (this.activeProject)
			const currSubtitle = '#subtitle-' + (this.activeProject)
			if (nextProject !== this.activeProject) {
				if (nextProject > this.activeProject) {
					this.slide(currProject, currTitle, currSubtitle, nextProject, 300, -300)
				}
				else {
					this.slide(currProject, currTitle, currSubtitle, nextProject, -300, 300)
				}
				this.updateImage()
			}
		}
	}

	// Slide current project out and new project in
	slide(currProject: any, currTitle: any, currSubtitle: any, id: number, slideFrom: number, slideTo: number){
		const newProject = '#project-' + id
		const newTitle = '#title-' + id
		const newSubtitle = '#subtitle-' + id
		var newSplitTitle = new SplitText(newTitle, {type: 'chars, lines', linesClass: 'line-container'})
		var currSplitTitle = new SplitText(currTitle, {type: 'chars, lines', linesClass: 'line-container'})
		var tl = new TimelineMax({onComplete:this.animDone()})
		
		tl
			.set(newProject, {y: (2 * slideFrom), autoAlpha: 0})
			.set(newTitle, {y: 0, autoAlpha: 1} )
			.set(newSplitTitle.chars, {y: slideFrom, autoAlpha: 0} )
			.set(newSubtitle, {y: slideFrom, autoAlpha: 1} )
			.set('.line-container', {overflow: 'hidden'})
		
		console.log(currTitle)
		console.log(newTitle)
		if (slideFrom > 0 ) {
			tl
				.staggerTo(currSplitTitle.chars, .5, {y: slideTo, autoAlpha: 0, ease: this.easeIn, onStart: this.animStart() }, .03)
				.to(currSubtitle, .5, {y: slideTo, autoAlpha: 1, ease: this.easeIn}, '-=.35')
				.to(currProject, .5, {y: (2 * slideTo), autoAlpha: 0, ease: this.easeIn })
				.to(newProject, .5, {y: 0 , autoAlpha: 1, ease: this.easeOut}, '-=.25')
				.staggerTo(newSplitTitle.chars, .5, {y: 0 , autoAlpha: 1, ease: this.easeOut }, .03, '-=.15', splitDone)
				.to(newSubtitle, .5, {y: 0 , autoAlpha: 1, ease: this.easeOut }, '-=.35')
			
		} else {
			tl
				.to(currSubtitle, .5, {y: slideTo, autoAlpha: 0, ease: this.easeIn, onStart: this.animStart() })
				.staggerTo(currSplitTitle.chars, .5, {y: slideTo, autoAlpha: 0, ease: this.easeIn}, .03,  '-=.0')
				.to(currProject, .5, {y: (2 * slideTo), autoAlpha: 0, ease: this.easeIn })
				.to(newProject, .5, {y: 0 , autoAlpha: 1, ease: this.easeOut}, '-=.25')
				.to(newSubtitle, .5, {y: 0 , autoAlpha: 1, ease: this.easeOut}, '-=.15')
				.staggerTo(newSplitTitle.chars, .5, {y: 0 , autoAlpha: 1, ease: this.easeOut }, .03, '-=.35', splitDone)
		}
		this.activeProject = id
		function splitDone(){
			newSplitTitle.revert();
			currSplitTitle.revert();
		}
		
		
	}
	

	// Update image on screen resize
	public onResize() {
			this.slides.forEach((slide) => {
				slide['active'] = false
			})
			this.updateImage()
	}

	// Updates active project
	private updateImage() {
		// Wait for animation to end
		setTimeout(() => {
			this.slides[this.activeProject - 1]['active'] = true
			this.slides.forEach((slide) => {
				if (slide !== this.slides[this.activeProject - 1]) {
					slide['active'] = false
				}
			})

		}, 900)
	}

	// Gets and assigns image dimensions and position
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

	// Adds delay to stop MacOSX inertia from triggering navigation
	animStart(){
		this.isMoving = true
		console.log('this.moving: ' + this.isMoving)
	}

	animDone(){
		
		setTimeout(() => {
			this.isMoving = false
			console.log('this.moving: ' + this.isMoving)
		}, 3500)
	}
	
}
