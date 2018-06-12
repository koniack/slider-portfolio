import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProject } from './project';
import { ProjectService } from './project.service';

@Injectable()
export class ProjectResolver implements Resolve<IProject> {
    constructor(
        private _projectService: ProjectService,
        private _router: Router
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IProject> {
        const id = route.params['id'];
        if (isNaN(id)) {
            console.log(`Project id was not a number: ${id}`);
            this._router.navigate(['/projects']);
            return Observable.of(null);
        }
        return this._projectService.getProject(+id)
            .map(project => {
                if (project) {
                    return project;
                }
                console.log(`Project was not found: ${id}`);
                this._router.navigate(['/projects']);
                return null;
            })
            .catch(error => {
                console.log(`Retrieval error: ${error}`);
                this._router.navigate(['/projects']);
                return Observable.of(null);
            });

    }

    }
