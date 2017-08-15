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
	title: string = 'Developer + Designer'
	color ='#000'; 
	loading: boolean = true;
	state: string = 'false';

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
		this.state = 'true';
	}
	if (routerEvent instanceof NavigationEnd || 
		routerEvent instanceof NavigationCancel ||
		routerEvent instanceof NavigationError){
			this.state = 'false';
			setTimeout(()=>{
				this.loading = false;
			}, 800)
			
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
