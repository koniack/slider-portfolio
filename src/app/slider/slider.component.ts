import {
	Component,
	OnInit,
	AfterViewInit,
	Output,
	EventEmitter
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { TimelineMax, TweenMax } from 'gsap';
import * as SplitText from 'gsap/SplitText';

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


	constructor(
				private _route: ActivatedRoute,
				private _router: Router,
			) {}

	ngOnInit(): void {
		this.slides = this._route.snapshot.data['projects']
		this.activeProject = +this._route.snapshot.queryParams['project'] || 1
		this.slides[this.activeProject - 1]['active'] = true
		console.log('this.activeProject = ' + this.activeProject)
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
		const newProjectId = '#projectId-' + id
		const currProjectId = '#projectId-' + this.activeProject
		const newButton = '#button-' + id
		const currButton = '#button-' + this.activeProject
		var newSplitTitle = new SplitText(newTitle, {type: 'chars, words', linesClass: 'line-container'})
		var currSplitTitle = new SplitText(currTitle, {type: 'chars, lines', linesClass: 'line-container'})
		var newSplitSub = new SplitText(newSubtitle, {type: 'words, lines', linesClass: 'line-container'})
		var currSplitSub = new SplitText(currSubtitle, {type: 'words, lines', linesClass: 'line-container'})
		var newSplitId = new SplitText(newProjectId, {type: 'words, lines', linesClass: 'line-container'})
		var currSplitId = new SplitText(currProjectId, {type: 'words, lines', linesClass: 'line-container'})
		var tl = new TimelineMax({onComplete:this.animDone(), onStart: this.animStart()})
		
		tl
			.set(['.line-container'], {overflow: 'hidden'})
			.set(newProject, {y: (2 * slideFrom), autoAlpha: 0})
			.set(newButton, {autoAlpha: 0})
		
		console.log('curr: ' + currProjectId)
		console.log('new: ' + newProjectId)
		if (slideFrom > 0 ) {
			tl.timeScale(1.5)	
				tl.staggerTo(currSplitId.words, .5, {y: (slideTo / 4),  ease: this.easeIn}, .03)
				.staggerTo(currSplitTitle.chars, .5, {'transform-origin': 'left top', transform: 'scaleY(0)', ease: this.easeIn }, .03, '-=.35')
				.staggerTo(currSplitSub.words, .5, {y: slideTo, autoAlpha: 1, ease: this.easeIn}, .03, '-=.35')
				.to(currButton, .5, {autoAlpha: 0})
				.to(currProject, .5, {y: (2 * slideTo), autoAlpha: 0, ease: this.easeIn })
				.to(newProject, .5, {y: 0 , autoAlpha: 1, ease: this.easeOut}, '-=.25')
				.staggerFrom(newSplitId.words, .5, {y: (slideFrom / 4), autoAlpha: 0, ease: this.easeOut}, .03)
				.staggerFrom(newSplitTitle.chars, .5, {'transform-origin': 'left bottom', transform: 'scaleY(0)',  ease: this.easeOut }, .03, '-=.15')
				.staggerFrom(newSplitSub.words, .5, {y: (slideFrom / 4) , autoAlpha: 0, ease: this.easeOut }, .03, '-=.25')
				.to(newButton, .5, {autoAlpha: 1 })
				.call(splitDone)
			
		} else {
			tl.timeScale(1.5 )	
				tl.to(currButton, .5, {autoAlpha: 0})
				.staggerTo(currSplitSub.words, .5, {y: slideTo, autoAlpha: 0, ease: this.easeIn}, .03)
				.staggerTo(currSplitTitle.chars.reverse(), .5, {'transform-origin': 'left bottom', transform: 'scaleY(0)',  ease: this.easeIn}, .03,  '-=.35')
				.staggerTo(currSplitId.words, .5, {y: (slideTo / 4),  ease: this.easeIn}, .03, '-=.35')
				.to(currProject, .5, {y: (2 * slideTo), autoAlpha: 0, ease: this.easeIn })
				.to(newProject, .5, {y: 0 , autoAlpha: 1, ease: this.easeOut}, '-=.25')
				.to(newButton, .5, {autoAlpha: 1 })
				.staggerFrom(newSplitSub.words, .5, {y: (slideFrom / 4) , autoAlpha: 0, ease: this.easeOut}, .03)
				.staggerFrom(newSplitTitle.chars, .5, {'transform-origin': 'left top',transform: 'scaleY(0)',  ease: this.easeOut }, .03, '-=.25')
				.staggerFrom(newSplitId.words, .5, {y: (slideFrom / 4), autoAlpha: 0, ease: this.easeOut}, .03, '-=.35')
				.call(splitDone)
		}
		this.activeProject = id
		function splitDone(){
			if (this.isMoving === 'true'){
					setTimeout(splitDone, 100)
			} else {
				newSplitTitle.revert();
				currSplitTitle.revert();
				newSplitId.revert();
				currSplitId.revert();
				newSplitSub.revert();
				currSplitSub.revert();
			}	
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

		}, 1400)
	}

	// Adds delay to stop MacOSX inertia from triggering navigation
	animStart(){
		this.isMoving = true
		console.log('this.moving: ' + this.isMoving)
	}

	animDone(){
		setTimeout(() => {
			this.isMoving = false
			console.log('this.moving: ' + this.isMoving)
		}, 3000)
	}
	
}
