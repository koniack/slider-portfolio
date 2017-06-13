import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';


@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.css'],
})
export class AppComponent  { 
	name = 'Kone Lathipanya';
	title: string = 'Developer + Designer'
	color ='#000'; 
	loading: boolean = true;

constructor(private _authService: AuthService,
			private _messageService: MessageService,
			private _router: Router) {
	_router.events.subscribe((routerEvent : Event) =>{
		this.checkRouterEvent(routerEvent);
	});
}

checkRouterEvent(routerEvent: Event): void {
	if (routerEvent instanceof NavigationStart) {
		this.loading = true;
	}
	if (routerEvent instanceof NavigationEnd || 
		routerEvent instanceof NavigationCancel ||
		routerEvent instanceof NavigationError){
			this.loading = false;
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
	
	
}
