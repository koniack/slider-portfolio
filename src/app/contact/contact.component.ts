import { Component } from '@angular/core'

import { WindowDimensionsService } from '../shared/window-dimensions.service'

@Component({
	moduleId: module.id,
	selector: 'contact-component',
	templateUrl: 'contact.component.html',
	styleUrls: ['contact.component.sass']
})

export class ContactComponent {
	email = 'kone.lathi@gmail.com'
	
	constructor(private _windowDimensionsService: WindowDimensionsService){
		
	}

}