import { Component, OnInit, Input } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';
import { ProjectDetailIdService } from './shared/project-detail-id.service';
import { routerAnimation } from './shared/router.animations';

//import { setTimeout } from 'timers';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.sass'],
	animations: [ routerAnimation ]
})
export class AppComponent  { 

	winHeight = window.innerHeight
	winWidth = window.innerWidth
	name = 'Kone Lathipanya';
	title: string = 'Designer + Developer'
	color ='#000'; 
	loading: boolean = true

	constructor(private _authService: AuthService,
				private _messageService: MessageService,
				private _router: Router,
				private _activatedRoute: ActivatedRoute,
				public _projectDetailIdService: ProjectDetailIdService) {
	}

	ngOnInit(): void {
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
	
	loadingPage(){
		this.loading = true
	}

	stopLoadingPage(){
		setTimeout(()=>{
			this.loading = false
	}, 5500)
				
	}

	getState(outlet){
		if (outlet.activatedRouteData.state === 'projectDetail'){
			var id: number = this._projectDetailIdService.getId();
			//console.log('projDetail state: ' + outlet.activatedRouteData['state'] + id)
			return outlet.activatedRouteData['state'] + id;
		} else {
			//console.log('state: ' + outlet.activatedRouteData['state'])
			return outlet.activatedRouteData['state'];
		}
	}

}
