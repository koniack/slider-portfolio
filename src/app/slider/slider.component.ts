import { 
	Component, 
	OnInit, 
	trigger, 
	state, 
	style, 
	transition, 
	animate, 
	keyframes
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ProjectService } from '../projects/project.service';
import { IProject } from '../projects/project';


@Component({
	moduleId: module.id,
	selector: 'slider-component',
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
				transform: 'translateY(-200%)',
				opacity: 0
			})),
			state('slideDownIn', style({
				transform: 'translateY(0)',
				opacity: 1
			})),
			state('slideDownOut', style({
				transform: 'translateY(200%)',
				opacity: 0
			})),
			transition('* => slideUpOut', [
				style({
					opacity: 1,
					transform: 'translateY(0)'
				}), 
				animate('1000ms cubic-bezier(0.23, 1, 0.32, 1)')
			]),
			transition('* => slideUpIn', [
				style({
					opacity: 0,
					transform: 'translateY(200%)'
				}), animate('1000ms 600ms cubic-bezier(0.23, 1, 0.32, 1)')
			]),
			transition('* => slideDownOut', [
				style({
					opacity: 1,
					transform: 'translateY(0)'
				}), 
				animate('1000ms cubic-bezier(0.23, 1, 0.32, 1)')
			]),
			transition('* => slideDownIn', [
				style({
					opacity: 0,
					transform: 'translateY(-200%)'
				}), animate('1000ms 600ms cubic-bezier(0.23, 1, 0.32, 1)')
			])
		]),
		trigger('slideTrigger', [
			state('slideUpIn', style({
				transform: 'translateY(0)',
				opacity: 1
			})),
			state('slideUpOut', style({
				transform: 'translateY(-'+ window.innerHeight+'px)',
				opacity: 0
			})),
			state('slideDownIn', style({
				transform: 'translateY(0)',
				opacity: 1
			})),
			state('slideDownOut', style({
				transform: 'translateY('+ window.innerHeight+'px)',
				opacity: 0
			})),
			transition('* => slideUpOut', [
				style({
					opacity: 1,
					transform: 'translateY(0)'
				}), 
				animate('650ms 200ms cubic-bezier(0.23, 1, 0.32, 1)')
			]),
			transition('* => slideUpIn', [
				style({
					opacity: 0,
					transform: 'translateY('+ window.innerHeight+'px)'
				}), animate('650ms 300ms cubic-bezier(0.23, 1, 0.32, 1)')
			]),
			transition('* => slideDownOut', [
				style({
					opacity: 1,
					transform: 'translateY(0)'
				}), 
				animate('650ms 200ms cubic-bezier(0.23, 1, 0.32, 1)')
			]),
			transition('* => slideDownIn', [
				style({
					opacity: 0,
					transform: 'translateY(-'+ window.innerHeight +'px)'
				}), animate('650ms 300ms cubic-bezier(0.23, 1, 0.32, 1)')
			])
		])
	]

})
export class SliderComponent implements OnInit { 

	slides: IProject[];
	errorMessage: string;
	activeProject: number = 0;
	screenRatio: number;
	isMoving: boolean = false;
	clicked: boolean = false;
	windowHeight: string = 'translateY('+window.innerHeight+'px)';

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
		this.slides[this.activeProject]['active'] = true;
		this.slides[this.slides.length - 1]['transition'] = 'slideUpOut';
		this.slides[this.activeProject+1]['transition'] = 'slideDownOut';

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
		event.preventDefault();
		if ((direction === 1 && this.activeProject < this.slides.length - 1) ||
			(direction === -1 && this.activeProject >0)) {
				if (direction == -1) {
					this.slides[this.activeProject]['transition'] = 'slideDownOut';
					this.slides[this.activeProject]['projTitleState'] = 'slideDownOut';
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
				slide['active'] = false;
			})
			this.updateImage();
	}
	
	private updateImage() {
		//wait for animation to end
		setTimeout(() => {
			this.slides[this.activeProject]['active'] = true
			this.slides.forEach((slide) => {
				if (slide != this.slides[this.activeProject]) {
					slide['active'] = false;
				}
			})
			
		}, 300)
	}

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
	
}
