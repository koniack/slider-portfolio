import { Component } from '@angular/core';
import { WindowDimensionsService } from '../shared/window-dimensions.service'

@Component({
	moduleId: module.id,
	selector: 'about-component',
	templateUrl: 'about.component.html',
	styleUrls: ['about.component.sass']
})

export class AboutComponent {
	email = 'kone.lathi@gmail.com'
	
	constructor(private _windowDimensionsService: WindowDimensionsService){}
}