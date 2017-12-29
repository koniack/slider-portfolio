import { Injectable } from '@angular/core';
import { Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

import { IProject } from './project';


@Injectable()
export class ProjectService {

	private _urlProject = 'api/projects';

	constructor(private _http: HttpClient) {}

	getProjects(): Observable<IProject[]>{
		return this._http.get(this._urlProject)
		//.map((response: Response) => <IProject[]> response.json());
            //.map(this.extractData)
            .do(data => console.log('getProjects: ' + JSON.stringify(data)))
            .catch(this.handleError);
	}

	getProject(id: number): Observable<IProject>{
        if (id === 0) {
            return Observable.of(this.initializeProject())
        };
		//return this.getProjects()
		//.map(projects => projects.find(project => project.id === id));
        const url = `${this._urlProject}/${id}`;
        return this._http.get(url)
            //.map(this.extractData)
            .do(data => console.log('getProject: ' + JSON.stringify(data)))
            .catch(this.handleError);
	}

	deleteProject(id: number): Observable<Response> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        const url = `${this._urlProject}/${id}`;
        return this._http.delete(url, options)
            .do(data => console.log('deleteProject: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    saveProject(project: IProject): Observable<IProject> {
        let options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

        if (project.id === 0) {
            return this.createProject(project, options);
        }
        return this.updateProject(project, options);
    }

	private createProject(project: IProject, options: any): Observable<IProject> {
        project.id = undefined;
        return this._http.post(this._urlProject, project, options)
            //.map(this.extractData)
            .do(data => console.log('createProject: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    private updateProject(project: IProject, options: any): Observable<IProject> {
        const url = `${this._urlProject}/${project.id}`;
        return this._http.put(url, project, options)
            .map(() => project)
            .do(data => console.log('updateProject: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    /*private extractData(response: Response) {
        let body = response;
        return body || {};
    }*/

    private handleError(error: Response): Observable<any> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }

    initializeProject(): IProject {
        // Return an initialized object
        return {
            id: 0,
            name: null,
            category: null,
            thumbUrl: null,
            projectPics: [],
            description: null,
            tags: []

        };
    }

}