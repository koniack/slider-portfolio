import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';


// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProjectData } from './projects/project-data';

import { AppComponent }  from './app.component';
import { NavComponent } from './nav/nav.component';
import { MouseWheelDirective } from './shared/mousewheel.directive';
import { AppRoutingModule, routableComponents } from './app-routing.module';
import { UserModule } from './user/user.module';
import { MessageModule } from './messages/message.module';
import { ProjectService } from './projects/project.service';
import { ProjectListResolver } from './projects/project-list-resolver.service'
import { ProjectResolver } from './projects/project-resolver.service'
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';



export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { direction: 31 } // override default swipeleft and swiperight only. adds swipeup and swipedown.
  }
}



@NgModule({
  imports: [ 
  	BrowserModule, 
  	FormsModule, 
  	HttpModule,
    InMemoryWebApiModule.forRoot(ProjectData, {delay: 1000}),
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
    MouseWheelDirective
  ],
  bootstrap:    [ AppComponent ],
  providers: [ {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  },
    ProjectService,
    ProjectListResolver,
    ProjectResolver
  ]
})
export class AppModule { }
