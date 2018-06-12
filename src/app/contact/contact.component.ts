import { Component } from '@angular/core'
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

import { WindowDimensionsService } from '../shared/window-dimensions.service'

@Component({
	moduleId: module.id,
	selector: 'contact-component',
	templateUrl: 'contact.component.html',
	styleUrls: ['contact.component.sass'],
	animations: [
		trigger('contactTransition', [
			transition(':enter', [
			  query('.columns', [
				useAnimation(fadeAnimation, {
				  params: {
					opacityFrom: 0,
					opacityTo: 1,
					translate3dFrom: 'translate3d(0,10%,0)',
					translate3dTo: 'translate3d(0,0,0)',
					time: '500ms'
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
					translate3dTo: 'translate3d(0,10%,0)',
					time: '500ms'
				  }
				})
			  ])
			])
		])
	],
	host: {
		'[@contactTransition]' : ''
	}
})

export class ContactComponent {
	email = 'kone.lathi@gmail.com'

	constructor(public _windowDimensionsService: WindowDimensionsService){

	}

}
