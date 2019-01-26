import {
	Component,
	OnInit,
	Output,
	EventEmitter
 } from '@angular/core';

 import {
	trigger,
	state,
	style,
	transition,
	animate,
	keyframes
 } from '@angular/animations';

import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

import { DOMEvents } from './DOMEvents.service';

import { TimelineMax, TweenMax } from 'gsap';

@Component({
	moduleId: module.id,
	selector: 'transition-overlay',
    template:
    `
    <span class="kLoader" >
        <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="-91.321 -91.321 300 300">
		<g kLoader [initialLoadKLoader]="initialLoad" ></g>
        </svg>

    </span>
    <span class="page-trans-overlay" [@pageTransitionTrigger]="state" *ngIf="loading" ></span>
    `
    ,
	styleUrls: ['transition-overlay.component.sass']
	,
	animations: [
		trigger('pageTransitionTrigger', [
			state('false', style({
				// transform: 'translateX(-200%)',
				opacity: 0

			})),
			state('true', style({
				// transform: 'translateX(0)',
				opacity: 1
			})),
			transition('* => true', [
				style({
					// transform: 'translateX(-200%)',
					opacity: 1
				}), animate('500ms ease-out')
			]),
			transition('* => false', [
				style({
					// transform: 'translateX(0)',
					opacity: 1
				}), animate('500ms ease-out')
			])
		])
	]
})
export class TransitionOverlayComponent implements OnInit {
	@Output() loadingPage = new EventEmitter()
	@Output() stopLoadingPage = new EventEmitter()

	loading = false;
	state = 'false';
	initialLoad = true;

	constructor(private _router: Router,
		private _domEvents: DOMEvents) {
		_router.events.subscribe((routerEvent: Event) => {
			this.checkRouterEvent(routerEvent);
		});
	}

	ngOnInit(): void {
		TweenMax.set('.kLoader svg', {visibility: 'hidden'});
	}

	checkRouterEvent(routerEvent: Event): void {

		if (routerEvent instanceof NavigationStart && this.initialLoad) {
			this.loadingPage.emit()
			this.loading = true;
			this.state = 'true';
			TweenMax.set('.kLoader svg', {visibility: 'hidden'});
			console.log(`loading: ` + this.loading);
		}

		if ((routerEvent instanceof NavigationEnd ||
			routerEvent instanceof NavigationCancel ||
			routerEvent instanceof NavigationError) && this.initialLoad){
				this._domEvents.triggerOnDocument('appready')
				TweenMax.set('.kLoader svg', {visibility: 'visible'});
				setTimeout(() => {
					this.state = 'false';
					this.stopLoadingPage.emit()
					TweenMax.set('.kLoader', {visibility: 'hidden', display: 'none'});
					console.log(`loading: ` + this.loading);
					this.initialLoad = false
				}, 4000);

				setTimeout(() => {
					this.loading = false;
				}, 4500);

			}
	}
}
