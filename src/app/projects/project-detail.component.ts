import { AfterViewInit, Component, HostListener, Inject, Input, OnInit, ViewChild, ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';


import { IProject } from './project';
import { IProjectPicture } from './project-picture';
import { AuthService } from '../user/auth.service';

import { ProjectService } from './project.service';
import { ProjectDetailIdService } from '../shared/project-detail-id.service';

import { TimelineMax, TweenMax } from "gsap";
import { projectDetailTransition } from 'app/shared/project-detail.animations';

import { SCROLLMAGIC_TOKEN } from '../shared/scrollMagic.service';

@Component({
  moduleId: module.id,
  selector: 'project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.sass'],
  animations: [ projectDetailTransition ],
  host: {
    '[@projectDetailTransition]': ''
  }
})
export class ProjectDetailComponent implements OnInit {
  
  //@ViewChild('projectThumb') projectThumbEl: ElementRef;

  project: IProject;
  nextProject: IProject;
  prevProject: IProject;
  title: string = 'Project Details';
  errorMessage: string;
  isLoggedIn: boolean = false;
  isShowing: boolean = false;
  url: string;
  id: number;
  winHeight: string = (window.innerHeight + 'px'); 
  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _authService: AuthService,
              @Inject(DOCUMENT) private _document: Document,
              private _projectService: ProjectService,
              public _projectDetailIdService: ProjectDetailIdService,
              @Inject(SCROLLMAGIC_TOKEN) private _scrollMagic: any
              ) { 
  }
  
  ngOnInit() {
    this._route.data.subscribe(
      data => this.project = data['project']
    );
    //console.log('project thumbUrl: ' + this.project.thumbUrl.url)
    this.id = this._route.snapshot.params['id'];
    this.updateId(this.id);
    this.getNextProject(+this.id);
    this.getPrevProject(+this.id);
    console.log(this._route.snapshot.params['id']);
    console.log('nextProject: ' + this.nextProject);

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

  ngAfterViewInit(){
    //this.animateThumb();  
    console.log('nextProject afterviewinit: ' + this.nextProject)

    var controller = new this._scrollMagic.Controller();
    var scene = new this._scrollMagic.Scene({
      triggerElement: '.thumbnail-text'
    })
    .setTween(TweenMax.from('.thumbnail-text', 1, {autoAlpha: 1, x: '-300px', ease:'Power2.easeOut'}))
    .addIndicators()
    .addTo(controller);    
    
  }

  @HostListener("window:scroll", [])
  onWindowScroll(){
    let number = this._document.body.scrollTop;
    if (number > 180) {
      this.isShowing = true;
    }
  }

  onPrev(): void {
    var prevPage:number

    if (this._route.snapshot.params['id'] > 1){
      prevPage = (+this._route.snapshot.params['id']) - 1; 
    } else {
      prevPage = 6
    }
    this._router.navigate([`/projects/${prevPage}`], { queryParamsHandling: "preserve" });
    this.getPrevProject(prevPage)
    this.getNextProject(prevPage)
    this.updateId(prevPage);
  }

  onNext(): void {
    var nextPage:number
    if (this._route.snapshot.params['id'] < 6 ){
      nextPage = (+this._route.snapshot.params['id']) + 1
    } else {
      nextPage = 1
    }
    this._router.navigate([`/projects/${nextPage}`], { queryParamsHandling: "preserve" } );        
    this.getPrevProject(nextPage)
    this.getNextProject(nextPage)
    this.updateId(nextPage)

  }

  getPrevProject(id: number): void {
    if (id > 1){
      var id = id - 1
    } else {
      var id = 6
    }
    this._projectService.getProject(+id).subscribe(
        project => this.prevProject = project,
        error => this.errorMessage = <any>error
    );
  }

  getNextProject(id: number): void{          
    if (id < 6){
      var id = id + 1
    } else {
      var id = 1
    }
    this._projectService.getProject(+id).subscribe(
        project => this.nextProject = project,
        error => this.errorMessage = <any>error
    );
  }

  updateId(id: number){
    this._projectDetailIdService.updateId(id);
  }
  /*getProject(id: number) {
    this._projectService.getProject(id).subscribe(
        project => this.project = project,
        error => this.errorMessage = <any>error
    );
  }
  /*animateThumb(){
    console.log(`projectThumb: ` + this.projectThumbEl.nativeElement);
    TweenMax.from(this.projectThumbEl.nativeElement, 5, {scale: 3, top: -254.983, left: 0});
  }*/

}
