import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { ProjectService } from './project.service';
import { IProject } from './project';


@Component({
	moduleId: module.id,
	selector: 'project-list',
	templateUrl: 'project-list.component.html',
	styleUrls: ['project-list.component.sass'],

})
export class ProjectListComponent implements OnInit {
	listFilter: string;
	errorMessage: string;
	projects: IProject[];
	filterCategory: string[] = ['Branding','Web Design','Logo Design'];

	constructor(private _projectService: ProjectService,
				private _route: ActivatedRoute){}

	ngOnInit(): void {
		if (this._route.snapshot.queryParams['filterBy'] == 'null'){
			this.listFilter = '';
		} else {
		this.listFilter = this._route.snapshot.queryParams['filterBy'] || '';
		}
		/*this._projectService.getProjects()
							.subscribe(
								projects => this.projects = projects,
								error => this.errorMessage = <any>error);*/
		this._route.data.subscribe (
      					data => this.projects = data['projects']);

	}
}
