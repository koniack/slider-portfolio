import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProjectListComponent } from './project-list.component';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectResolver } from './project-resolver.service';
import { ProjectListResolver } from './project-list-resolver.service';
import { ProjectEditComponent } from './project-edit.component';
import { ProjectEditInfoComponent } from './project-edit-info.component';
import { ProjectEditTagsComponent } from './project-edit-tags.component';
import { AuthGuard } from '../user/auth-guard.service';
import { ProjectEditGuard } from './project-guard.service';




const routes: Routes = [
    { 
        path: '', 
        component: ProjectListComponent,
        resolve: { projects: ProjectListResolver }
    },
    { 
        path: ':id', 
        component: ProjectDetailComponent, 
        resolve: { project: ProjectResolver}
    },
    { 
        path: ':id/edit', 
        component: ProjectEditComponent,
        resolve: { project: ProjectResolver },
        canActivate: [ AuthGuard ], 
        canDeactivate: [ ProjectEditGuard ],
        children: [
            {
                path: '', 
                redirectTo: 'info', 
                pathMatch: 'full'
            },
            {
                path: 'info', 
                component: ProjectEditInfoComponent
            },
            {
                path: 'tags', 
                component: ProjectEditTagsComponent
            }
        ]

    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        AuthGuard, 
        ProjectEditGuard
        ]
})
export class ProjectRoutingModule {}

export const projectRoutableComponents = [
    ProjectListComponent,
    ProjectDetailComponent,
    ProjectEditComponent,
    ProjectEditInfoComponent,
    ProjectEditTagsComponent,
];