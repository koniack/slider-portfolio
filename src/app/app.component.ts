import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.sass'],
})
export class AppComponent  { 
	@Output() readyEvent = new EventEmitter()	

	winHeight = window.innerHeight
	winWidth = window.innerWidth
	name = 'Kone Lathipanya';
	title: string = 'Designer + Developer'
	color ='#000'; 
	loading: boolean = false

	constructor(private _authService: AuthService,
				private _messageService: MessageService,
				private _router: Router) {
	
	}

	ngOnInit(): void {
		console.log('Appcomponent load..')
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
		this.loading = false		
	}
	handleAppReady(data){
		console.log('received: ' + data)
	}
}
