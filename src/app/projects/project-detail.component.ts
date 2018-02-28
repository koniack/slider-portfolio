import { OnChanges, OnDestroy, AfterViewInit, Component, HostListener, Inject, Input, OnInit, ViewChild, ViewChildren, ElementRef, QueryList} from '@angular/core';
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
//import { JQ_TOKEN } from 'app/shared/jQuery.service';

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
  @ViewChildren("picture") pictures: QueryList<any>;
  //@ViewChild("header") header: ElementRef;
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
  winHeight: number = window.innerHeight; 
  controller: any;
  pinHeader: any;
  fadeScene: any;

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _authService: AuthService,
              //@Inject(DOCUMENT) private _document: Document,
              private _projectService: ProjectService,
              private _projectDetailIdService: ProjectDetailIdService,
              @Inject(SCROLLMAGIC_TOKEN) private _scrollMagic: any,
              //@Inject(JQ_TOKEN) public $: any
              ) { 
  }
  
  ngOnInit() {
    window.scrollTo(0, 0);

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
    

    this.controller = new this._scrollMagic.Controller();
    this.pinHeader = new this._scrollMagic.Scene({
      triggerElement: 'header',
      triggerHook: 0,
      duration: '30%'
    })
    .setPin('header', {pushFollowers: false})
    .addTo(this.controller);

    var pinIntro = new this._scrollMagic.Scene({
      triggerElement: '.thumbnail-container',
      triggerHook: 0,
      duration: '30%'
    })
    .setPin('.thumb-container', {pushFollowers: false})
    .addTo(this.controller)


    this.pictures.forEach((picture) => {
      //console.log('picture: ' + picture.nativeElement);
      this.fadeScene = new this._scrollMagic.Scene({
        triggerElement: picture.nativeElement,
        triggerHook: 0.8
      })
      .setTween(TweenMax.from(picture.nativeElement, 1, {autoAlpha: 0, ease:'Power2.easeOut'}))
      .addIndicators({
        name: 'fade scene',
        colorTrigger: 'black',
        colorStart: '#75c695',
        colorEnd: 'pink'
      })
      .addTo(this.controller);
    });
  }

  /*ngOnChanges(){
    console.log('OnChanges triggered!')
    this.controller = new this._scrollMagic.Controller();
    this.pictures.forEach((picture) => {
      console.log('picture: ' + picture.nativeElement);
      this.fadeScene = new this._scrollMagic.Scene({
        triggerElement: picture.nativeElement,
        triggerHook: 0.8
      })
      .setTween(TweenMax.from(picture.nativeElement, 1, {autoAlpha: 0, ease:'Power2.easeOut'}))
      .addIndicators({
        name: 'fade scene',
        colorTrigger: 'black',
        colorStart: '#75c695',
        colorEnd: 'pink'
      })
      .addTo(this.controller);
    });
  }*/

  ngOnDestroy(){
    //console.log('OnDestroy triggered!')
    this.controller.destroy('reset');
    //this.controller = null;
    //this.pinHeader = this.pinHeader.destroy(true);
  }

  /*@HostListener("window:scroll", [])
  onWindowScroll(){
    let number = this._document.body.scrollTop;
    if (number > 180) {
      this.isShowing = true;
    }
  }*/

  onPrev(): void {
    var prevPage:number

    if (this._route.snapshot.params['id'] > 1){
      prevPage = (+this._route.snapshot.params['id']) - 1; 
    } else {
      prevPage = 6
    }
    this._router.navigate([`/slider`], { queryParamsHandling: "preserve" });
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
    this._router.navigate([`/projects/${nextPage}`], { queryParams: {'project': nextPage}, queryParamsHandling: "merge", fragment: "top"});        
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
        //error => this.errorMessage = <any>error
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
        //error => this.errorMessage = <any>error
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
