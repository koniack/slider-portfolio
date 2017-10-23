import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';

import { IProject } from './project';
import { IProjectPicture } from './project-picture';
import { AuthService } from '../user/auth.service';

import { ProjectService } from './project.service';

import { TimelineMax, TweenMax } from "gsap";

@Component({
  moduleId: module.id,
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.sass']
})
export class ProjectDetailComponent implements OnInit {
  
  //@ViewChild('projectThumb') projectThumbEl: ElementRef;

  project: IProject;
  nextProject: IProject;
  title: string = 'Project Details';
  errorMessage: string;
  isLoggedIn: boolean = false;
  isShowing: boolean = false;
  url: string;
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _authService: AuthService,
              @Inject(DOCUMENT) private _document: Document,
              private _projectService: ProjectService
              ) { 

  }
  ngOnInit(): void {
    this._route.data.subscribe (
      data => this.project = data['project']
    );

    /*this._route.params.subscribe(
      params => {
        let id = +params['id'] + 1;
        //this.getProject(id);
        //let url = 
        console.log(this.url);
      }
    )*/
    
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

  /*ngAfterViewInit(){
    this.animateThumb();    
  }
  /*getProject(id: number) {
    this._projectService.getProject(id).subscribe(
        project => this.project = project,
        error => this.errorMessage = <any>error
    );
  }*/
  /*getNextProject(id: number) {
    this._projectService.getProject(id).subscribe(
        project => this.nextProject = nextProject,
        error => this.errorMessage = <any>error
    );
  }*/

  @HostListener("window:scroll", [])
  onWindowScroll(){
    let number = this._document.body.scrollTop;
    if (number > 180) {
      this.isShowing = true;
    }
  }

  onBack(): void {
    this._router.navigate(['/projects'], { queryParamsHandling: "preserve" });
  }

  onNext(): void {

    let nextPage = (+this._route.snapshot.params['id']) + 1; 
    this._router.navigate([`/projects/${nextPage}`], { queryParamsHandling: "preserve" } );    

  }
  /*animateThumb(){
    console.log(`projectThumb: ` + this.projectThumbEl.nativeElement);
    TweenMax.from(this.projectThumbEl.nativeElement, 5, {scale: 3, top: -254.983, left: 0});
  }*/

}
