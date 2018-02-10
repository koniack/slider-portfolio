import { Component, OnInit, AfterViewInit, Output, Input, EventEmitter} from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';


import { TimelineMax, TweenMax } from "gsap";
import * as MorphSVGPlugin from "gsap/MorphSVGPlugin";
//import * as DrawSVGPlugin from "gsap/DrawSVGPlugin";
import * as drawSVG from "gsap/DrawSVGPlugin";

@Component({
    moduleId: module.id,
    selector: `[kLoader]`,
    template:
        `<svg:g>
        <g id="kLogo">
            <path id="kLineBottom" fill="#FFF" d="M58.043 62.98l11.873 20.955h2.3l-12.77-22.537z"/>
            <path id="kLineTop" fill="#FFF" d="M49.29 53.878L67.614 32.97h2.666L49.274 56.96z"/>
            <path id="kTop" fill="#FFF" d="M50.682 55.366l-9.417 10.762V33.055h9.433v19.228z"/>
            <path id="kLineLeft" fill="#FFF" d="M35 33.16h2v51.23h-2z"/>
            <path id="kCircle" fill="none" stroke="#FFF" stroke-width="9" stroke-linecap="round" stroke-miterlimit="10" d="M58.68 10.813c26.436 0 47.867 21.43 47.867 47.866s-21.43 47.867-47.866 47.867c-26.437 0-47.868-21.432-47.868-47.868 0-26.436 21.43-47.867 47.87-47.867"/>
            <path id="kRight" fill="#FFF" d="M61.73 57.782L76.487 83.84H87.36L68.355 50.006z"/>
            <path id="kBottom" fill="#FFF" d="M69.577 52.16l16.63-19.152h-11.16l-33.78 38.425v12.954l21.685-24.45z"/>
        </g>
        <g id="kLinesStart" fill="#FFF">
            <path id="leftStart" d="M35 33.16h2v.772h-2z"/>
            <path id="topStart" d="M50.698 52.283v-.013l-1.41 1.608-.015 3.083 1.41-1.61z"/>
            <path id="bottomStart" d="M59.445 61.398l-1.402 1.582.86 1.52 1.403-1.58z"/>
        </g>
        <g id="dots">
            <g id="dotsGroup" fill="#FFF">
            <circle id="dot4" cx="88.486" cy="58.679" r="4.787"/>
            <circle id="dot3" cx="68.615" cy="58.679" r="4.787"/>
            <circle id="dot2" cx="48.744" cy="58.679" r="4.787"/>
            <circle id="dot1" cx="28.873" cy="58.679" r="4.787"/>
            </g>
        </g>
        <g id="dotsEnd" fill="#FFF">
            <circle id="dot4End" cx="79.28" cy="79.04" r="4.787"/>
            <circle id="dot3End" cx="46.052" cy="73.146" r="4.787"/>
            <circle id="dot2End" cx="46.052" cy="37.947" r="4.787"/>
            <circle id="dot1End" cx="58.679" cy="10.709" r="4.787"/>
        </g>
        <g id="paths" fill="none" stroke="#30EFEF" stroke-linecap="square" stroke-miterlimit="10">
            <path id="path1" stroke-width=".206" d="M28.932 58.254c-2.09-4.337-3.26-9.2-3.26-14.337 0-18.264 14.805-33.07 33.07-33.07l-.062-.034c26.435 0 47.865 21.43 47.865 47.866s-21.43 47.867-47.866 47.867c-26.44 0-47.87-21.432-47.87-47.868 0-26.436 21.43-47.867 47.87-47.867"/>
            <path id="path4" stroke-width=".233" d="M88.676 58.68c0 21.505-17.434 38.94-38.94 38.94-21.507 0-38.94-17.436-38.94-38.94l.016-.002c0-26.435 21.43-47.866 47.87-47.866v.14c20.583 0 37.27 16.687 37.27 37.272 0 12.926-6.58 24.315-16.572 31"/>
            <path id="path3" stroke-width=".299" d="M68.51 58.46c0 15.94-12.92 28.858-28.856 28.858-15.938 0-28.858-12.92-28.858-28.857l.017.22c0-26.436 21.43-47.867 47.87-47.867v.142c17.868 0 32.355 14.488 32.355 32.356 0 17.87-14.487 32.357-32.356 32.357-4.463 0-8.716-.904-12.584-2.538"/>
            <path id="path2" stroke-width=".212" d="M48.714 58.775C39.892 54.928 33.726 46.13 33.726 35.89c0-13.78 11.172-24.953 24.954-24.953v-.125c26.436 0 47.867 21.43 47.867 47.866h.124c0 18.73-15.183 33.915-33.912 33.915-18.73 0-33.916-15.184-33.916-33.915 0-7.834 2.657-15.047 7.118-20.79"/>
        </g>
		</svg:g>`
})
export class  KLoaderComponent { 
	@Input() initialLoadKLoader: boolean;

    dotAnim = new TimelineMax({repeat:-1, repeatDelay:0, paused: true});

	constructor(private _router: Router){
		
        _router.events.subscribe((routerEvent : Event) =>{
        this.checkRouterEvent(routerEvent);
        });
    }
    
    ngOnInit(): void {
		MorphSVGPlugin.convertToPath('#dotsGroup circle');
		MorphSVGPlugin.convertToPath('#dotsEnd circle');
		TweenMax.set(['#paths,#kLogo','#dotsEnd'], {visibility: 'hidden'});		
        //this.dotAnimation();
		drawSVG;	
	}

	ngAfterViewInit(){
		
	}
	
	checkRouterEvent(routerEvent: Event): void {
		
		if (routerEvent instanceof NavigationStart && this.initialLoadKLoader) {
			TweenMax.set('#kCircle', {visibility: 'visible', rotation: 0, opacity: 1, drawSVG: '0% 0%'});
			//TweenMax.set('#dotsGroup path', {visibility: 'visible', opacity: 1, x: 0, y: 0});
			//this.dotAnim.play(0);
		}

		if ((routerEvent instanceof NavigationEnd || 
			routerEvent instanceof NavigationCancel ||
			routerEvent instanceof NavigationError) && this.initialLoadKLoader){
				
				this.kAnimation();
				setTimeout(()=>{
					TweenMax.set('#kCircle', {visibility: 'hidden', opacity: 0});
					TweenMax.set('#dotsEnd path', {visibility: 'hidden', opacity: 0});
					TweenMax.set('#kLinesStart', {visibility: 'hidden', opacity: 0});					
				}, 6000)
				
			}
	} 

    dotAnimation(){
		
	
		this.dotAnim.staggerTo('#dotsGroup path', .35, {y: -20, opacity: .2}, .1)
			.staggerTo('#dotsGroup path', .35, {y: 0, opacity: 1}, .1, .35);
	};
	
	kAnimation(){
		//this.dotAnim.tweenTo(3.4);
		TweenMax.set('#dotsGroup path', {visibility: 'visible', opacity: 1, x: 0, y: 0});

		let path4 = MorphSVGPlugin.pathDataToBezier("#path4",{align:'relative'});
		let path3 = MorphSVGPlugin.pathDataToBezier("#path3",{align:'relative'});
		let path2 = MorphSVGPlugin.pathDataToBezier("#path2",{align:'relative'});
		let path1 = MorphSVGPlugin.pathDataToBezier("#path1",{align:'relative'});
		
		TweenMax.set('#dotsGroup path', {visibility: 'visible', opacity: 1, x: 0, y: 0});
		TweenMax.set('#dotsEnd path', {visibility: 'visible', opacity: 0, x: 0, y: 0});
		TweenMax.set('#kCircle', {visibility: 'visible', rotation: 0, opacity: 1, drawSVG: '0% 0%'});
		TweenMax.to('#dot4End', .75, {morphSVG: '#dot4End'});
		TweenMax.to('#dot3End', .75, {morphSVG: '#dot3End'});
		TweenMax.to('#dot2End', .75, {morphSVG: '#dot2End'});
		TweenMax.set('#kLinesStart', {visibility: 'visible', opacity: 0});
		TweenMax.to('#leftStart', .75, {morphSVG: '#leftStart'})
		TweenMax.to('#topStart', .75, {morphSVG: '#topStart'})
		TweenMax.to('#bottomStart', .75, {morphSVG: '#bottomStart'})

		var kAnim = new TimelineMax();
		kAnim
		  //.set('#dotsGroup path', {visibility: 'visible', opacity: 1, x: 0, y: 0})
		  .to('#dot4', .75 , {bezier:{values:path4, type: "cubic"}},"+=1.25")
		  .to('#dot3', .75 , {bezier:{values:path3, type: "cubic"}}, "-=.5")
		  .to('#dot2', .75 , {bezier:{values:path2, type: "cubic"}}, "-=.55")
		  .to('#dot1', .75 , {bezier:{values:path1, type: "cubic"}}, "-=.6")
		  .set('#dotsGroup path', {opacity: 0})
		  .set('#dotsEnd path', {opacity: 1})
		  .set('#dot1End', {opacity: 0})
		  .to('#dot4End', .75, {morphSVG: "#kRight"})
		  .to('#dot3End', .75, {morphSVG: "#kBottom"},"-=.65")
		  .to('#dot2End', .75, {morphSVG: "#kTop"},"-=.65")
		  .to('#kCircle', .25, {drawSVG: '0% 25%', ease:'Linear.easeNone'}, "-=1 ")
		  .to('#kCircle', .5, {rotation: 360, transformOrigin: '50% 50%', ease:'Linear.easeNone'},"-=.75")
		  .set('#kLinesStart', {opacity:1})
		  .to('#leftStart', .25, {morphSVG: '#kLineLeft'})
		  .to('#topStart', .25, {morphSVG: '#kLineTop'},'-=.15')
		  .to('#bottomStart', .25, {morphSVG: '#kLineBottom'},'-=.15')
		  .to('#kCircle', .5, {drawSVG: '0% 100%'}, "-=.75")	
	}
}

