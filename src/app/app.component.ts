import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, ActivatedRoute } from '@angular/router';
import { Location, PopStateEvent, CommonModule } from '@angular/common';

import { AuthService } from './user/auth.service';
import { MessageService } from './messages/message.service';
import { ProjectDetailIdService } from './shared/project-detail-id.service';
import { routerAnimation } from './shared/router.animations';
import { LoadingService } from './shared/loading.service';

@Component({
	moduleId: module.id,
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.sass'],
	animations: [ routerAnimation ]
})
export class AppComponent implements OnInit  {

	winHeight = window.innerHeight
	winWidth = window.innerWidth
	name = 'Kone Lathipanya';
	title = 'Designer + Developer'
	color = '#000';
	loading = true;
	isAnimating = false;
	private lastPoppedUrl: string;
    private yScrollStack: number[] = []; 

	constructor(private _authService: AuthService,
				private _messageService: MessageService,
				private _router: Router,
				private _location: Location,
				private _activatedRoute: ActivatedRoute,
				private _loadingService: LoadingService,
				private _projectDetailIdService: ProjectDetailIdService, ) {

	}

	ngOnInit(): void {

		this._location.subscribe((ev:PopStateEvent) => {
            this.lastPoppedUrl = ev.url;
        });
        this._router.events.subscribe((ev:any) => {
            if (ev instanceof NavigationStart) {
                if (ev.url != this.lastPoppedUrl)
                    this.yScrollStack.push(window.scrollY);
            } else if (ev instanceof NavigationEnd) {
                if (ev.url == this.lastPoppedUrl) {
                    this.lastPoppedUrl = undefined;
                    window.scrollTo(0, this.yScrollStack.pop());
                } else
                    window.scrollTo(0, 0);
            }
        });

		this._loadingService.getData().subscribe(data => {
			this.isAnimating = data;
		})
	}

	displayMessages(): void {
		this._router.navigate([{ outlets: { popup: ['messages'] }}]);
		this._messageService.isDisplayed = true;
	}

	hideMessages(): void {
		this._router.navigate([{outlets: { popup: null }}] );
		this._messageService.isDisplayed = false;
	}

	logOut(): void {
		this._authService.logout();
		this._router.navigateByUrl('./slider');
	}

	loadingPage() {
		this.loading = true
	}

	stopLoadingPage() {
		this.loading = false
	}

	getState(outlet) {
		if (outlet.activatedRouteData.state === 'projectDetail') {
			const id: number = this._projectDetailIdService.getId();
			return outlet.activatedRouteData['state'] + id;
		} else {
			return outlet.activatedRouteData['state'];
		}
	}
	handleAppReady(event) {
	}
}
