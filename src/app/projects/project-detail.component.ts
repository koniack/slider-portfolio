import {
  OnChanges,
  OnDestroy,
  AfterViewInit,
  Component,
  HostListener,
  Inject, Input,
  OnInit, ViewChild,
  ViewChildren,
  ElementRef,
  QueryList} from '@angular/core';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';


import { IProject } from './project';
import { IProjectPicture } from './project-picture';
import { AuthService } from '../user/auth.service';

import { ProjectService } from './project.service';
import { ProjectDetailIdService } from '../shared/project-detail-id.service';

import { TimelineMax, TweenMax } from 'gsap';
import { projectDetailTransition } from 'app/shared/project-detail.animations';

import { SCROLLMAGIC_TOKEN } from '../shared/scrollMagic.service';
import { LoadingService } from '../shared/loading.service';
// import { JQ_TOKEN } from 'app/shared/jQuery.service';


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
export class ProjectDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('picture') pictures: QueryList<any>;
  // @ViewChild("header") header: ElementRef;
  // @ViewChild('projectThumb') projectThumbEl: ElementRef;

  project: IProject;
  nextProject: IProject;
  prevProject: IProject;
  title = 'Project Details';
  errorMessage: string;
  isLoggedIn = false;
  isShowing = false;
  url: string;
  id: number;
  winHeight: number = window.innerHeight;
  controller: any;
  pinHeader: any;
  fadeScene: any;
  loading: boolean;
  easing: any = 'Power2.easeOut';

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _authService: AuthService,
              // @Inject(DOCUMENT) private _document: Document,
              private _projectService: ProjectService,
              private _projectDetailIdService: ProjectDetailIdService,
              @Inject(SCROLLMAGIC_TOKEN) public _scrollMagic: any,
              private _loadingService: LoadingService
              // @Inject(JQ_TOKEN) public $: any
              ) {
  }

  ngOnInit() {

    this._loadingService.getData().subscribe(data => {
      this.loading = data;
    })

    this._route.data.subscribe(
      data => this.project = data['project']
    );
    // console.log('project thumbUrl: ' + this.project.thumbUrl.url)
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
    // this.project = this._route.snapshot.data['project'];
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
    // this.animateThumb();
    console.log('nextProject afterviewinit: ' + this.nextProject)


    this.controller = new this._scrollMagic.Controller();

    this.pinHeader = new this._scrollMagic.Scene({
      triggerElement: '.transition-overlay',
      triggerHook: 0,
      duration: '50%'
    })
    .setPin('.navbar', {pushFollowers: false})
    .addTo(this.controller);

    const pinIntro = new this._scrollMagic.Scene({
      triggerElement: '.thumbnail-container',
      triggerHook: 0,
      duration: '50%'
    })
    .setPin('.thumb-container', {pushFollowers: false})
    .addTo(this.controller)


    this.pictures.forEach((picture) => {
      // console.log('picture: ' + picture.nativeElement);
      this.fadeScene = new this._scrollMagic.Scene({
        triggerElement: picture.nativeElement,
        triggerHook: 0.8
      })
      .setTween(TweenMax.from(picture.nativeElement, 1, {autoAlpha: 0, ease: 'Power2.easeOut'}))
      /*.addIndicators({
        name: 'fade scene',
        colorTrigger: 'black',
        colorStart: '#75c695',
        colorEnd: 'pink'
      })*/
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
    // console.log('OnDestroy triggered!')
    this.controller.destroy('reset');
    // this.controller = null;
    // this.pinHeader = this.pinHeader.destroy(true);
  }

  /*@HostListener("window:scroll", [])
  onWindowScroll(){
    let number = this._document.body.scrollTop;
    if (number > 180) {
      this.isShowing = true;
    }
  }*/

  onPrev(): void {
    let prevPage: number

    if (this._route.snapshot.params['id'] > 1){
      prevPage = (+this._route.snapshot.params['id']) - 1;
    } else {
      prevPage = 6
    }
    this._router.navigate([`/slider`], { queryParamsHandling: 'preserve' });
    this.getPrevProject(prevPage)
    this.getNextProject(prevPage)
    this.updateId(prevPage);
  }

  onNext(): void {
    this._loadingService.updateData(true);
    const tl = new TimelineMax;

    // TweenMax.set('scrollmagic-pin-spacer', {visibilty: 'hidden', height: 0 });
    tl.to('.project-detail', .4, {autoAlpha: 0, height: 0, transform: 'scale(0.8)', ease: this.easing })
    .to(['.detail-footer', '.button'], .4, {height: this.winHeight + 'px',  ease: this.easing}, '-=.4');
    // window.scrollTo(0, 0);

    let nextPage: number
    if (this._route.snapshot.params['id'] < 6 ){
      nextPage = (+this._route.snapshot.params['id']) + 1
    } else {
      nextPage = 1
    }
    console.log('nextpage: ' + nextPage);
    setTimeout(() => {
      // tslint:disable-next-line:max-line-length
      this._router.navigate([`/projects/${nextPage}`], { queryParams: {'project': nextPage}, queryParamsHandling: 'merge', fragment: 'top'});
    }, 1000)

    if ((this._router.events instanceof NavigationEnd ||
			this._router.events instanceof NavigationCancel ||
			this._router.events instanceof NavigationError)){
          this.getPrevProject(nextPage)
          this.getNextProject(nextPage)
          this.updateId(nextPage)
          this._loadingService.updateData(false);
          console.log('nextpage: ' + nextPage);
		}
  }

  getPrevProject(i: number): void {
    if (i > 1){
      const id = i - 1
    } else {
      const id = 6
    }
    this._projectService.getProject(+i).subscribe(
        project => this.prevProject = project,
        // error => this.errorMessage = <any>error
    );
  }

  getNextProject(i: number): void{
    let id = 0;
    if (i < 6){
       id = i + 1
    } else {
      id = 1
    }
    this._projectService.getProject(id).subscribe(
        project => this.nextProject = project,
        // error => this.errorMessage = <any>error
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
