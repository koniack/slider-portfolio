import { Component, Output, EventEmitter } from '@angular/core';
import { OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';
import { AnimatingService } from '../shared/animating.service';

@Component({
	moduleId: module.id,
	selector: 'nav-component',
	templateUrl: 'nav.component.html',
	styleUrls: ['nav.component.sass']
})

export class NavComponent implements OnInit{
	@Output() loadingPage = new EventEmitter()
    @Output() stopLoadingPage = new EventEmitter()

	isActive = false;
	isLoggedIn: boolean;

	constructor(private _authService: AuthService,
				private _router: Router,
				private _animatingService: AnimatingService) {}
	logOut(): void{
		this._authService.logout();
		console.log('Log Out');
		this._router.navigateByUrl('./slider');
	}

	active(name: string){
		const msg = `You clicked ${name}`;
		console.log(msg);
		if (this.isActive = !this.isActive){
			this.loadingPage.emit()
			console.log('nav-component: ' + this.isActive)
		} else {
			this.stopLoadingPage.emit()
			console.log('nav-component: ' + this.isActive)
		}
	}

	ngOnInit(){}

	ngAfterViewInit(){

	}

}
