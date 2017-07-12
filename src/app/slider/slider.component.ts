import { 
	Component, 
	OnInit, 
	trigger, 
	state, 
	style, 
	transition, 
	animate, 
	keyframes,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ProjectService } from '../projects/project.service';
import { IProject } from '../projects/project';


@Component({
	moduleId: module.id,
	selector: 'slider',
	templateUrl: 'slider.component.html',
	styleUrls: ['slider.component.sass'],
	host: {
        '(document:keydown)': 'onKeydown($event)',
    },
	animations: [
		trigger('projTitleTrigger', [
			state('slideUpIn', style({
				transform: 'translateY(0)',
				opacity: 1
			})),
			state('slideUpOut', style({
				transform: 'translateY(-300px)',
				opacity: 0
			})),
			state('slideDownIn', style({
				transform: 'translateY(0)',
				opacity: 1
			})),
			state('slideDownOut', style({
				transform: 'translateY(300px)',
				opacity: 0
			})),
			transition('* => slideUpOut', [
				style({
					opacity: 1,
					transform: 'translateY(0)'
				}), 
				animate('500ms ease-out')
			]),
			transition('* => slideUpIn', [
				style({
					opacity: 0,
					transform: 'translateY(600px)'
				}), animate('500ms 750ms ease-out')
			]),
			transition('* => slideDownOut', [
				style({
					opacity: 1,
					transform: 'translateY(0)'
				}), 
				animate('500ms ease-out')
			]),
			transition('* => slideDownIn', [
				style({
					opacity: 0,
					transform: 'translateY(-600px)'
				}), animate('500ms 750ms ease-out')
			])
		]),
		trigger('pageTransitionTrigger', [
			state('false', style({
				borderWidth: '15px',
				//opacity: 1

			})),
			state('true', style({
				borderWidth: 0,
				top: 0,
				left: 0
				//opacity: 0
			})),
			transition('false => true', [
				style({
					borderWidth: '15px',
					//opacity: 1
				}), animate('500ms ease-in')
			])
		]),
		trigger('slideTrigger', [
			state('slideUpIn', style({
				transform: 'translateY(0)',
				opacity: 1
			})),
			state('slideUpOut', style({
				transform: 'translateY(-600px)',
				opacity: 0
			})),
			state('slideDownIn', style({
				transform: 'translateY(0)',
				opacity: 1
			})),
			state('slideDownOut', style({
				transform: 'translateY(600px)',
				opacity: 0
			})),
			transition('* => slideUpOut', [
				style({
					opacity: 1,
					transform: 'translateY(0)'
				}), 
				animate('300ms 200ms ease-out')
			]),
			transition('* => slideUpIn', [
				style({
					opacity: 0,
					transform: 'translateY(600px)'
				}), animate('300ms 700ms ease-out')
			]),
			transition('* => slideDownOut', [
				style({
					opacity: 1,
					transform: 'translateY(0)'
				}), 
				animate('300ms 200ms ease-out')
			]),
			transition('* => slideDownIn', [
				style({
					opacity: 0,
					transform: 'translateY(-600px)'
				}), animate('300ms 700ms ease-out')
			])
		])
	]

})
export class SliderComponent implements OnInit { 




	slides: IProject[];
	errorMessage: string;
	activeProject: number = 0;
	imgWidth: number = 600;
	imgHeight: number = 600;
	screenWidth: number;
	screenHeight: number;
	imgRatio: number;
	screenRatio: number;
	imgPosTop: number;
	imgPosLeft: number;
	isMoving: boolean = false;
	clicked: boolean = false;

	constructor(private _projectService: ProjectService,
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
		this.updateImage();
	}

	pageTransition(event:any){
		event.preventDefault;
		this.clicked = true;
		console.log('clicked='+this.clicked);
		this.imgPosLeft = 0;
		this.imgPosTop = 0;
		setTimeout(() =>{
			this._router.navigate(['/projects', this.activeProject + 1]);
		}, 500)

	}

	mouseWheelUpFunc(){
		if (!this.isMoving){
			this.navigate(1, false);
		}
	}
	
	mouseWheelDownFunc(){
		if (!this.isMoving){
			this.navigate(-1, false);
		}
	}
		
	preventScroll(event: any) {
		event.preventDefault();
		event.stopPropagation();
	}

	animStart(event:any){

		this.isMoving = true;
	}
	animDone(event:any){

		setTimeout(()=>{
			this.isMoving = false;
		}, 300)
		
	}

	 private onKeydown(event: KeyboardEvent) {
        let prevent = [38, 40]
            .find(no => no === event.keyCode)
        if (prevent) {
            event.preventDefault()
        }

        switch (prevent) {
            case 38:
                // navigate left
                this.navigate(-1, false)
                break
            case 40:
                // navigate right
                this.navigate(1, false)
                break
        }
    }


	private navigate(direction: number, swipe: any) {
		if ((direction === 1 && this.activeProject < this.slides.length - 1) ||
			(direction === -1 && this.activeProject >0)) {
				if (direction == -1) {
					this.slides[this.activeProject]['transition'] = 'slideDownOut';
					this.slides[this.activeProject]['projTitleState'] = 'slideDownOut'
					this.slides[this.activeProject -1 ]['transition'] = 'slideDownIn';
					this.slides[this.activeProject -1 ]['projTitleState'] = 'slideDownIn';
				}
				else {
					this.slides[this.activeProject]['transition'] = 'slideUpOut';
					this.slides[this.activeProject]['projTitleState'] = 'slideUpOut'
					this.slides[this.activeProject + 1]['transition'] = 'slideUpIn';
					this.slides[this.activeProject +1 ]['projTitleState'] = 'slideUpIn';
				}
				this.activeProject += direction;
				this.updateImage();
			}
			else {
				if (this.activeProject > this.slides.length - 2) {
					this.slides[this.activeProject]['transition'] = 'slideUpOut';
					this.slides[this.activeProject]['projTitleState'] = 'slideUpOut'

					this.activeProject = 0;
					this.slides[this.activeProject]['transition'] = 'slideUpIn';
					this.slides[this.activeProject]['projTitleState'] = 'slideUpIn'
				}
				else {
					this.slides[this.activeProject]['transition'] = 'slideDownOut';
					this.slides[this.activeProject]['projTitleState'] = 'slideDownOut'
					this.activeProject = this.slides.length - 1;
					this.slides[this.activeProject]['transition'] = 'slideDownIn';
					this.slides[this.activeProject]['projTitleState'] = 'slideDownIn'
				}
				this.updateImage();
			}
	}

	private navigateToProj(indicatorIndex: number) {
		if (indicatorIndex != this.activeProject) {
			if (indicatorIndex > this.activeProject) {
				this.slides[this.activeProject]['transition'] = 'slideUpOut';
				this.slides[this.activeProject]['projTitleState'] = 'slideUpOut';
				this.activeProject = indicatorIndex;
				this.slides[this.activeProject]['transition'] = 'slideUpIn';
				this.slides[this.activeProject]['projTitleState'] = 'slideUpIn';
			} 
			else {
				this.slides[this.activeProject]['transition'] = 'slideDownOut';
				this.slides[this.activeProject]['projTitleState'] = 'slideDownOut';
				this.activeProject = indicatorIndex;
				this.slides[this.activeProject]['transition'] = 'slideDownIn';
				this.slides[this.activeProject]['projTitleState'] = 'slideDownIn';
			}
			this.updateImage();
		}
	}

	public onResize() {
			this.slides.forEach((slide) => {
				slide['active'] = false
			})
			this.updateImage()
		}

	private updateImage() {
		//wait for animation to end
		setTimeout(() => {
			this.slides[this.activeProject]['active'] = true
			this.slides.forEach((slide) => {
				if (slide != this.slides[this.activeProject]) {
					slide['active'] = false
				}
			})
			this.setDimensions();
		}, 500)
	}

	private setDimensions(): any {

			this.screenWidth = window.innerWidth;
			this.screenHeight = window.innerHeight;
			this.imgHeight = this.slides[this.activeProject].thumbUrl.height;
			this.imgWidth = this.slides[this.activeProject].thumbUrl.width;
			this.screenRatio = this.screenHeight / this.screenWidth;
			this.imgRatio = this.imgHeight / this.imgWidth;
			/*if (this.imgWidth > this.imgHeight) {
				this.imgWidth = this.screenHeight * this.imgRatio;
				this.imgHeight = this.screenHeight;
			}else {
				this.imgHeight = this.screenWidth * this.imgRatio;
				this.imgWidth = this.screenWidth;
			}*/
			if (this.screenRatio > this.imgRatio) {
				this.imgHeight = this.screenHeight;
				this.imgWidth = this.screenHeight / this.imgRatio; 
			} else {
				this.imgHeight = this.screenWidth * this.imgRatio;
				this.imgWidth = this.screenWidth;
			}
			this.imgPosLeft = (this.screenWidth - this.imgWidth) / 2;
			this.imgPosTop = (this.screenHeight - this.imgHeight) / 2;
			console.log('img ratio: ' +this.imgRatio+' img width: '+this.imgWidth+' img height: '+this.imgHeight+' screen ratio: '+this.screenRatio+' screen height: '+this.screenHeight+ ' screen width: ' +this.screenWidth+  ' image top: '+this.imgPosTop+' img left: '+this.imgPosLeft);
			

	} 
	
}
