import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../user/auth.service';

@Component({
	moduleId: module.id,
	selector: 'nav-component',
	templateUrl: 'nav.component.html',
	styleUrls: ['nav.component.sass']
})

export class NavComponent implements OnInit{
	isActive = false;
	isLoggedIn: boolean;

	constructor(private _authService: AuthService,
				private _router: Router) {}
	logOut(): void{
		this._authService.logout();
		console.log('Log Out');
		this._router.navigateByUrl('./slider');
	}

	active(name: string){
		const msg = `You clicked ${name}`;
		console.log(msg);
		this.isActive = !this.isActive;
	}

	ngOnInit(){}
}
