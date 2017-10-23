import { 
	Component, 
	OnInit, 
	AfterViewInit
	//ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { TimelineMax, TweenMax } from "gsap";

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
	host: {
        '(document:keydown)': 'onKeydown($event)',
    }

})
export class SliderComponent implements OnInit { 

	slides: IProject[];
	errorMessage: string;
	activeProject: number = 0;
	isMoving: boolean = false;
	winHeight: number = window.innerHeight;
	tl = new TimelineMax;

	constructor(//private _projectService: ProjectService,
				private _route: ActivatedRoute,
				private _router: Router){}

	ngOnInit(): void {
		/*this._projectService.getProjects()
							.subscribe(
								slides => this.slides = slides,
								error => this.errorMessage = <any>error
							);*/
		this._route.data.subscribe (
						  data => this.slides = data['slides']);
		this.slides[this.activeProject]['active'] = true;
	}

	ngAfterViewInit(){
		TweenMax.set('.project-hero', { y: this.winHeight, visibility: 'hidden'})
		TweenMax.set('#project' + this.activeProject, { y:0, visibility: 'visible'})
		TweenMax.set('#projTitle' + this.activeProject, {y:0, visibility: 'visible'} )
	}

	//Mousewheel navigation using Mousewheel directive
	mouseWheelUpFunc(){
		if (!this.isMoving){
			this.navigate('next', false);
		}
	}
	
	mouseWheelDownFunc(){
		if (!this.isMoving){
			this.navigate('prev', false);
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
		let currTitle = '#projTitle'+(this.activeProject)
		
		if ((direction === 'next' && this.activeProject < this.slides.length - 1) ||
			(direction === 'prev' && this.activeProject >0)) {
				if (direction == 'prev') {
					this.slide(currProject, currTitle, (this.activeProject - 1), -this.winHeight, this.winHeight);
				}
				else {
					this.slide(currProject, currTitle, (this.activeProject + 1), this.winHeight, -this.winHeight);
				}
				this.updateImage();
			}
			else {
				if (this.activeProject === 0) {
					this.slide(currProject, currTitle, (this.activeProject + this.slide.length), -this.winHeight, this.winHeight)
					
				}
				else {
					this.slide(currProject, currTitle, 0, this.winHeight, -this.winHeight)
				}
				this.updateImage();
			}
	}

	//Navigates to specific project designated by indicators
	private navigateToProj(indicatorIndex: number) {
		let currProject = '#project'+(this.activeProject);
		let currTitle = '#projTitle'+(this.activeProject);
		if (indicatorIndex != this.activeProject) {
			if (indicatorIndex > this.activeProject) {
				this.slide(currProject, currTitle, indicatorIndex, this.winHeight, -this.winHeight);
			} 
			else {
				this.slide(currProject, currTitle, indicatorIndex, -this.winHeight, this.winHeight);
			}
			this.updateImage();
		}
	}

	//Slide current project out and new project in
	slide(currProject: any, currTitle: any, id: number, slideFrom: number, slideTo: number){
		let newProject = '#project' + id;
		let newTitle = '#projTitle' + id;
		this.tl
			.set(newProject, {y:slideFrom, autoAlpha: 0})
			.set(newTitle, {y:slideFrom} )
			.to(currTitle, .5, {y: slideTo, autoAlpha: 0, ease:'Power2.easeIn', onStart: this.animStart() })
			.to(currProject, .5, {y: slideTo, autoAlpha: 0, ease:'Power2.easeIn' },'-=.25' )
			.to(newProject, .5, {y: 0 , autoAlpha: 1, ease:'Power2.easeOut'},'-=.25')
			.to(newTitle, .5, {y: 0 , autoAlpha: 1, ease:'Power2.easeOut', onComplete: this.animDone() },'-=.15');
		this.activeProject = id;
	}

	//Update image on screen resize
	public onResize() {
			this.slides.forEach((slide) => {
				slide['active'] = false;
			})
			this.updateImage();
	}

	//Updates active project
	private updateImage() {
		//Wait for animation to end
		setTimeout(() => {
			this.slides[this.activeProject]['active'] = true
			this.slides.forEach((slide) => {
				if (slide != this.slides[this.activeProject]) {
					slide['active'] = false;
				}
			})
			
		}, 900)
	}

	//Gets and assigns image dimensions and position
	getSliderImgDim(id:number) {
		let screenWidth = window.innerWidth;
		let screenHeight = window.innerHeight;
		let imgHeight = this.slides[id].thumbUrl.height;
		let imgWidth = this.slides[id].thumbUrl.width;
		let screenRatio = screenHeight / screenWidth;
		let imgRatio = imgHeight / imgWidth;
		
		if (screenRatio > imgRatio) {
			imgHeight = screenHeight;
			imgWidth = screenHeight / imgRatio; 
		} else {
			imgHeight = screenWidth * imgRatio;
			imgWidth = screenWidth;
		}
		let imgPosLeft = (screenWidth - imgWidth) / 2;
		let imgPosTop = (screenHeight - imgHeight) / 2;
		return {width: imgWidth+'px', height: imgHeight+'px', top: imgPosTop+'px', left: imgPosLeft+'px'};
	}
	
	//Adds delay to stop MacOSX inertia from triggering navigation
	animStart(){
		this.isMoving = true;
	}

	animDone(){
		setTimeout(()=>{
			this.isMoving = false;
		}, 900)
	}
}
