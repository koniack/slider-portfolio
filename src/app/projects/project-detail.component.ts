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
import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
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
import { WindowDimensionsService } from '../shared/window-dimensions.service';

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
  @ViewChild('iconScrollContainer') iconScrollContEl: ElementRef;
  @ViewChild('thumbnail') thumbnailEl: ElementRef;

  project: IProject;
  video: boolean = false;
  nextProject: IProject;
  prevProject: IProject;
  title = 'Project Details';
  errorMessage: string;
  isLoggedIn = false;
  isShowing = false;
  url: string;
  id: number;
  winHeight: number;
  controller: any;
  pinHeader: any;
  fadeScene: any;
  fadeOutScroll: any;
  loading: boolean;
  easing: any = 'Power2.easeOut';
  embed: any;

  constructor(private _route: ActivatedRoute,
              private _sanitizer: DomSanitizer,
              private _router: Router,
              private _authService: AuthService,
              private _projectService: ProjectService,
              private _projectDetailIdService: ProjectDetailIdService,
              @Inject(SCROLLMAGIC_TOKEN) public _scrollMagic: any,
              private _loadingService: LoadingService,
              public _windowDimensionsService: WindowDimensionsService
              ) {
  }

  ngOnInit() {
    this._loadingService.getData().subscribe(data => {
      this.loading = data;
    })
    this._route.data.subscribe(
      data => this.project = data['project']
    );
    this.id = this._route.snapshot.params['id'];
    this.updateId(this.id);
    this.getNextProject(+this.id);
    this.getPrevProject(+this.id);
    this.embed = this._sanitizer.bypassSecurityTrustHtml('<iframe src="https://player.vimeo.com/video/' + this.project.video + '" width="640" height="358" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; width: 100%; height: 100%; top: 0; left: 0"></iframe>');
    this.winHeight = this._windowDimensionsService.winHeight

  }

  getEmbedUrl(project){
    return this._sanitizer.bypassSecurityTrustHtml('https://player.vimeo.com/video/' + project.video);
  }
  ngAfterViewInit(){
    this.controller = new this._scrollMagic.Controller();
    this.fadeOutScroll = new this._scrollMagic.Scene({
      triggerElement: this.thumbnailEl.nativeElement,
      triggerHook: .95,
      reverse: false
    })
    .setTween(TweenMax.to(this.iconScrollContEl.nativeElement, 1, {opacity: 0, ease: this.easing}))
    
    .addTo(this.controller);

    this.pictures.forEach((picture) => {
      this.fadeScene = new this._scrollMagic.Scene({
        triggerElement: picture.nativeElement,
        triggerHook: 0.7
      })
      .setTween(TweenMax.from(picture.nativeElement, .5, {autoAlpha: 0, ease: this.easing}))

      .addTo(this.controller);
    });
  }

  ngOnDestroy(){
    this.controller.destroy('reset');
  }

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

    tl.to('.project-detail', .4, {opacity: 0, transform: 'scale(0.8)', ease: this.easing })
    .to('.project-detail', .4, {height: 0, ease: this.easing }, '-=.2')
    .to(['.button'], .5, {height: this._windowDimensionsService.winHeight,  ease: this.easing}, '-=.4');

    let nextPage: number
    if (this._route.snapshot.params['id'] < 6 ){
      nextPage = (+this._route.snapshot.params['id']) + 1
    } else {
      nextPage = 1
    }
    setTimeout(() => {
      this._router.navigate([`/projects/${nextPage}`], { queryParams: {'project': nextPage}, queryParamsHandling: 'merge'});
    }, 1000)

    if ((this._router.events instanceof NavigationEnd ||
			this._router.events instanceof NavigationCancel ||
			this._router.events instanceof NavigationError)){
          this.getPrevProject(nextPage)
          this.getNextProject(nextPage)
          this.updateId(nextPage)
          this._loadingService.updateData(false);
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
    );
  }

  updateId(id: number){
    this._projectDetailIdService.updateId(id);
  }

}
