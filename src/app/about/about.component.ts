import { Component } from '@angular/core';
import { WindowDimensionsService } from '../shared/window-dimensions.service'
// Import Animation Assets
import {
	sequence,
	trigger,
	stagger,
	animate,
	style,
	group,
	query,
	transition,
	keyframes,
	animateChild,
	useAnimation } from '@angular/animations';
// const query = (s, a, o= {optional: true}) => q(s, a, o);
import { fadeAnimation } from '../shared/animations';

@Component({
	moduleId: module.id,
	selector: 'about-component',
	templateUrl: 'about.component.html',
	styleUrls: ['about.component.sass'],
	animations: [
		trigger('aboutTransition', [
			transition(':enter', [
			  query('.columns', [
				useAnimation(fadeAnimation, {
				  params: {
					opacityFrom: 0,
					opacityTo: 1,
					translate3dFrom: 'translate3d(0,5%,0)',
					translate3dTo: 'translate3d(0,0,0)',
					time: '300ms'
				  }
				})
			  ])
			]),
			transition(':leave', [
			  query('.columns', [
				useAnimation(fadeAnimation, {
				  params: {
					opacityFrom: 1,
					opacityTo: 0,
					translate3dFrom: 'translate3d(0,0,0)',
					translate3dTo: 'translate3d(0,5%,0)',
					time: '300ms'
				  }
				})
			  ])
			])
		])
	],
	host: {
		'[@aboutTransition]' : ''
	}
})

export class AboutComponent {
	email = 'kone.lathi@gmail.com'

	constructor(public _windowDimensionsService: WindowDimensionsService){}
}
