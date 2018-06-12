import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProject } from './project';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectListResolver implements Resolve<IProject[]> {
    projects: IProject[];

    constructor(
        private _projectService: ProjectService,
        private _router: Router
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProject[]> {

        return this._projectService.getProjects()
							.map(
								projects => this.projects = projects);



    }

    }
