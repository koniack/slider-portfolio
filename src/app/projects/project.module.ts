import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ProjectListComponent } from './project-list.component';
import { ProjectDetailComponent } from './project-detail.component';
//import { ProjectService } from './project.service';
import { ProjectRoutingModule, projectRoutableComponents } from './project-routing.module';
import { ProjectFilterPipe } from './project-filter.pipe';





@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ProjectRoutingModule,
        HttpClientModule
    ],
    declarations: [
        ProjectListComponent,
        ProjectDetailComponent,
        ProjectFilterPipe,
        projectRoutableComponents

    ],
    providers: [

    ]
})
export class ProjectModule{}
