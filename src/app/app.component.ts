import { Component, OnInit, Input } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, group, query, animate } from '@angular/animations';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';

//import { setTimeout } from 'timers';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.sass'],
	/*animations: [
		trigger('routeAnimation', [
			transition('1 => 2', [
				style({ height: '!'}),
				query(':enter', style({ transform: 'translateX(100%)' })),
				query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0}) ),
				group([
					query(':leave', [animate('0.3s cubic-bezier(.35, 0 , .25, 1' )], style({ transform: 'translateX(-100%)'}) ),
					query(':enter', [animate('0.3s cubic-bezier(.35, 0 , .25, 1' )], style({ transform: 'translateX(0)'}) )
					
				])
			] )
		])
	]*/
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
				private _activatedRoute: ActivatedRoute) {
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

	getDepth(outlet){
		//console.log('outlet depth: ' + outlet._activatedRouteData['depth']);
	}

}
