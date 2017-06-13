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
import { ActivatedRoute } from '@angular/router';
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
		trigger('slideTrigger', [
			state('slideUpIn', style({
				transform: 'translate(0px, 0px)',
				opacity: 1,
			})),
			state('slideUpOut', style({
				transform: 'translate(0px,-300%)',
				opacity: 0
			})),
			state('slideDownIn', style({
				transform: 'translate(0px, 0px)',
				opacity: 1,
			})),
			state('slideDownOut', style({
				transform: 'translate(0px,300%)',
				opacity: 0
			})),
			transition('* => slideUpOut', [
				style({
					opacity: 1,
					transform: 'translate(0px, 0px)'
				}), 
				animate('500ms ease-out')
			]),
			transition('* => slideUpIn', [
				style({
					opacity: 0,
					transform: 'translate(0px, 300%)'
				}), animate('500ms 250ms ease-out')
			]),
			transition('* => slideDownOut', [
				style({
					opacity: 1,
					transform: 'translate(0px, 0px)'
				}), 
				animate('500ms ease-out')
			]),
			transition('* => slideDownIn', [
				style({
					opacity: 0,
					transform: 'translate(0px, -300%)'
				}), animate('500ms 250ms ease-out')
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


	constructor(private _projectService: ProjectService,
				private _route: ActivatedRoute){}
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
					this.slides[this.activeProject -1 ]['transition'] = 'slideDownIn';
				}
				else {
					this.slides[this.activeProject]['transition'] = 'slideUpOut';
					this.slides[this.activeProject + 1]['transition'] = 'slideUpIn';
				}
				this.activeProject += direction;
				this.updateImage();
			}
			else {
				if (this.activeProject > this.slides.length - 2) {
					this.slides[this.activeProject]['transition'] = 'slideUpOut';
					this.activeProject = 0;
					this.slides[this.activeProject]['transition'] = 'slideUpIn';
				}
				else {
					this.slides[this.activeProject]['transition'] = 'slideDownOut';
					this.activeProject = this.slides.length - 1;
					this.slides[this.activeProject]['transition'] = 'slideDownIn';
				}
				this.updateImage();
			}
	}

	private navigateToProj(indicatorIndex: number) {
		if (indicatorIndex != this.activeProject) {
			if (indicatorIndex > this.activeProject) {
				this.slides[this.activeProject]['transition'] = 'slideUpOut';
				this.activeProject = indicatorIndex;
				this.slides[this.activeProject]['transition'] = 'slideUpIn';
			} 
			else {
				this.slides[this.activeProject]['transition'] = 'slideDownOut';
				this.activeProject = indicatorIndex;
				this.slides[this.activeProject]['transition'] = 'slideDownIn';
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
			this.imgHeight = this.slides[this.activeProject].thumbUrl.width;
			this.imgWidth = this.slides[this.activeProject].thumbUrl.height;
			this.screenRatio = this.screenHeight / this.screenWidth;
			this.imgRatio = this.imgHeight / this.imgWidth;
			if (this.screenRatio > this.imgRatio) {
				this.imgHeight = this.screenHeight;
				this.imgWidth = this.screenHeight * this.imgRatio; 
			} else {
				this.imgHeight = this.screenWidth / this.imgRatio;
				this.imgWidth = this.screenWidth;
			}
			this.imgPosLeft = (this.screenWidth - this.imgWidth) / 2;
			this.imgPosTop = (this.screenHeight - this.imgHeight) / 2;
			//console.log(this.imgRatio, this.imgWidth, this.imgHeight, this.screenHeight, this.screenWidth, this.imgPosTop, this.imgPosLeft);
			

	} 
	
}
