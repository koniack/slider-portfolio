import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProject } from './project';
//import { ProjectService } from './project.service';

@Component({
  moduleId: module.id,
  selector: 'project-detail',
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {
  project: IProject;
  title: string = 'Project Details';
  errorMessage: string;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              //private _projectService: ProjectService
              ) { 

  }
  ngOnInit(): void {
    this._route.data.subscribe (
      data => this.project = data['project']);
    // Snapshot Method for ProjectResolver
    //this.project = this._route.snapshot.data['project'];
    // Snapshot Method
    // let id = +this._route.snapshot.params['id'];
    // Observable Method
   // this._route.params.subscribe(
     // params => {
   //     let id = +params['id'];
     //   this.getProject(id);
     // }
   // )
  }

 /* getProject(id: number) {
    this._projectService.getProject(id).subscribe(
        project => this.project = project,
        error => this.errorMessage = <any>error
    );
  }*/

  onBack(): void {
    this._router.navigate(['/projects'], { preserveQueryParams: true });
  }

  onNext(): void {
    let nextPage = (+this._route.snapshot.params['id']) + 1; 
    this._router.navigate([`/projects/${nextPage}`], { preserveQueryParams: true } );
    

  }
}
