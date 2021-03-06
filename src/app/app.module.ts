import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProjectData } from './projects/project-data';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { MouseWheelDirective } from './shared/mousewheel.directive';
import { TransitionOverlayComponent } from './shared/transition-overlay.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { ProjectService } from './projects/project.service';
import { ProjectListResolver } from './projects/project-list-resolver.service'
import { ProjectResolver } from './projects/project-resolver.service'
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { KLoaderComponent } from './shared/kLoader.component';
import { WindowDimensionsService } from './shared/window-dimensions.service';
import { DOMEvents } from './shared/DOMEvents.service';
import { ProjectDetailIdService } from 'app/shared/project-detail-id.service';
import { SCROLLMAGIC_TOKEN } from './shared/scrollMagic.service';
import { JQ_TOKEN } from './shared/jQuery.service';
import { CustomReuseStrategy } from './shared/route.reuse';
import { LoadingService } from './shared/loading.service';

declare module 'gsap' {
  export interface TweenConfig {
    [p: string]: any;
  }
}

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: 31 } // override default swipeleft and swiperight only. adds swipeup and swipedown.
  }
}


// declare let ScrollMagic: Object;
// tslint:disable-next-line:prefer-const
let ScrollMagic = window['ScrollMagic'];
// tslint:disable-next-line:prefer-const
let jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProjectData, {delay: 0}),
    UserModule,
    MessageModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AboutComponent,
    ContactComponent,
    routableComponents,
    NavComponent,
    MouseWheelDirective,
    KLoaderComponent,
    TransitionOverlayComponent
  ],
  bootstrap:    [ AppComponent ],
  providers: [ {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  },
    ProjectService,
    ProjectListResolver,
    ProjectResolver,
    WindowDimensionsService,
    LoadingService,
    DOMEvents,
    ProjectDetailIdService,
    {provide: SCROLLMAGIC_TOKEN, useValue: ScrollMagic},
    {provide: JQ_TOKEN, useValue: jQuery},
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ]
})
export class AppModule { }
