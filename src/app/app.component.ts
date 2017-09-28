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
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';
import { TimelineMax, TweenMax } from "gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import DrawSVGPlugin from "gsap/DrawSVGPlugin";
import drawSVG from "gsap/DrawSVGPlugin";
declare module "gsap" {
	export interface TweenConfig {
	  [p: string]: any;
	}
  } 

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.sass'],
	animations: [
		trigger('pageTransitionTrigger', [
			state('false', style({
				transform: 'translateX(100%)',
				//opacity: 0

			})),
			state('true', style({
				transform: 'translateX(0)',
				//opacity: 1
			})),
			transition('* => true', [
				style({
					transform: 'translateX(-100%)',
					//opacity: 0
				}), animate('500ms ease-out')
			]),
			transition('* => false', [
				style({
					transform: 'translateX(0)',
					//opacity: 1
				}), animate('500ms ease-out')
			])
		])
	]
})
export class AppComponent  { 
	name = 'Kone Lathipanya';
	title: string = 'Designer + Developer'
	color ='#000'; 
	loading: boolean = true;
	state: string = 'false';
	dotAnim = new TimelineMax({repeat:-1, repeatDelay:0, paused: true});

	constructor(private _authService: AuthService,
				private _messageService: MessageService,
				private _router: Router) {
		_router.events.subscribe((routerEvent : Event) =>{
			this.checkRouterEvent(routerEvent);
		});
	}

	ngOnInit(): void {
		this.dotAnimation();
		drawSVG;
	}

	checkRouterEvent(routerEvent: Event): void {
		let dots = this.selectAll('#dotsGroup path');
		let dotsEnd = this.selectAll('#dotsEnd path');
		let kLogo = this.select('#kLogo');
		let kCircle = this.select('#kCircle');

		if (routerEvent instanceof NavigationStart) {
			this.loading = true;
			this.state = 'true';
			TweenMax.set(kCircle, {visibility: 'visible', rotation: 0, opacity: 1, drawSVG: '0% 0%'});
			TweenMax.set(dots, {visibility: 'visible', opacity: 1, x: 0, y: 0});
			this.dotAnim.play(0);
		}

		if (routerEvent instanceof NavigationEnd || 
			routerEvent instanceof NavigationCancel ||
			routerEvent instanceof NavigationError){
				
				this.kAnimation();
				setTimeout(()=>{
					this.loading = false;
					this.state = 'false';
					console.log(this.loading);
					TweenMax.set(kCircle, {visibility: 'hidden', opacity: 0});
					TweenMax.set(dotsEnd, {visibility: 'hidden', opacity: 0});
					TweenMax.set('#kLinesStart', {visibility: 'hidden', opacity: 0});
					console.log(kLogo);
					
				}, 5500)
				
			}
	}

	displayMessages(): void {
		this._router.navigate([{ outlets: { popup: ['messages'] }}]);
		this._messageService.isDisplayed = true;
	}

	hideMessages(): void {
		this._router.navigate([{outlets: { popup: null }}] );
		this._messageService.isDisplayed = false;
	}

	logOut(): void{
		this._authService.logout();
		console.log('Log Out');
		this._router.navigateByUrl('./slider');
	}

	
	
	dotAnimation(){
		MorphSVGPlugin.convertToPath('circle');
		let dot1 = this.select('#dot1');
		let dot2 = this.select('#dot2');
		let dot3 = this.select('#dot3');
		let dot4 = this.select('#dot4');
		let dots = this.selectAll('#dotsGroup path');

		console.log('dotAnimation started')

		let kCircle = this.select('#kCircle');
		let dotsEnd = this.selectAll('#dotsEnd path');
		let dot2End = this.select('#dot2End');
		let dot3End = this.select('#dot3End');
		let dot4End = this.select('#dot4End');

		//console.log(drawSVG);
		
		//TweenMax.set(dotsEnd, {visibility: 'visible', opacity: 0, x: 0, y: 0});
		//TweenMax.set(kCircle, {visibility: 'visible', rotation: 0, opacity: 1, drawSVG: '0% 0%'});
		//TweenMax.to(dot4End, 1, {morphSVG: dot4End})
		//TweenMax.to(dot3End, 1, {morphSVG: dot3End},"-=.9")
		//TweenMax.to(dot2End, 1, {morphSVG: dot2End},"-=.9")
		//TweenMax.set('#kLinesStart', {visibility: 'visible', opacity: 0});
		//TweenMax.to('#leftStart', 1, {morphSVG: '#leftStart'})
		//TweenMax.to('#topStart', 1, {morphSVG: '#topStart'})
		//TweenMax.to('#bottomStart', 1, {morphSVG: '#bottomStart'})
		
		//var dotAnim = new TimelineMax({repeat:-1, repeatDelay:0, paused: true});
	
		this.dotAnim.staggerTo(dots, .35, {y: -20, opacity: .2}, .1)
			.staggerTo(dots, .35, {y: 0, opacity: 1}, .1, .35);
			
		console.log(dots);
	};
	
	kAnimation(){
		this.dotAnim.tweenTo(3.4);
		
		let kCircle = this.select('#kCircle');
		let dots = this.selectAll('#dotsGroup path');
		let dotsEnd = this.selectAll('#dotsEnd path');
		let dot1 = this.select('#dot1');
		let dot2 = this.select('#dot2');
		let dot3 = this.select('#dot3');
		let dot4 = this.select('#dot4');
		let dot1End = this.select('#dot1End');
		let dot2End = this.select('#dot2End');
		let dot3End = this.select('#dot3End');
		let dot4End = this.select('#dot4End');
		let path4 = MorphSVGPlugin.pathDataToBezier("#path4",{align:'relative'});
		let path3 = MorphSVGPlugin.pathDataToBezier("#path3",{align:'relative'});
		let path2 = MorphSVGPlugin.pathDataToBezier("#path2",{align:'relative'});
		let path1 = MorphSVGPlugin.pathDataToBezier("#path1",{align:'relative'});
		
		TweenMax.set(dots, {visibility: 'visible', opacity: 1, x: 0, y: 0});
		TweenMax.set(dotsEnd, {visibility: 'visible', opacity: 0, x: 0, y: 0});
		TweenMax.set(kCircle, {visibility: 'visible', rotation: 0, opacity: 1, drawSVG: '0% 0%'});
		TweenMax.to(dot4End, 1, {morphSVG: dot4End});
		TweenMax.to(dot3End, 1, {morphSVG: dot3End});
		TweenMax.to(dot2End, 1, {morphSVG: dot2End});
		TweenMax.set('#kLinesStart', {visibility: 'visible', opacity: 0});
		TweenMax.to('#leftStart', 1, {morphSVG: '#leftStart'})
		TweenMax.to('#topStart', 1, {morphSVG: '#topStart'})
		TweenMax.to('#bottomStart', 1, {morphSVG: '#bottomStart'})
		//TweenMax.set(kCircle, {visibility: 'visible', rotation: 0, opacity: .5, drawSVG: '0% 0%'});

		var kAnim = new TimelineMax();
		kAnim
		  .set(dots, {visibility: 'visible', opacity: 1, x: 0, y: 0})
		  .to(dot4, 1, {bezier:{values:path4, type: "cubic"}},"+=1")
		  .to(dot3, 1, {bezier:{values:path3, type: "cubic"}}, "-=.75")
		  .to(dot2, 1, {bezier:{values:path2, type: "cubic"}}, "-=.75")
		  .to(dot1, 1, {bezier:{values:path1, type: "cubic"}}, "-=.75")
		  .set(dots, {opacity: 0})
		  .set(dotsEnd, {opacity: 1})
		  .set(dot1End, {opacity: 0})
		  .to(dot4End, 1, {morphSVG: "#kRight"})
		  .to(dot3End, 1, {morphSVG: "#kBottom"},"-=.9")
		  .to(dot2End, 1, {morphSVG: "#kTop"},"-=.9")
		  .to('#kCircle', .25, {drawSVG: '0% 25%', ease:'Linear.easeNone'}, "-=1.2")
		  .to('#kCircle', .5, {rotation: 360, transformOrigin: '50% 50%', ease:'Linear.easeNone'},"-=1")
		  .set('#kLinesStart', {opacity:1})
		  .to('#leftStart', .5, {morphSVG: '#kLineLeft'})
		  .to('#topStart', .5, {morphSVG: '#kLineTop'},'-=.25')
		  .to('#bottomStart', .5, {morphSVG: '#kLineBottom'},'-=.25')
		  .to(kCircle, 1, {drawSVG: '0% 100%'}, "-=1.5")
	}

	select(s:any):any{
		console.log('s: '+ s);
		return document.querySelector(s);
	}

	selectAll(s:any):any{
		return document.querySelectorAll(s);
	}
	
}
