import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';
import { SliderComponent }  from './slider/slider.component';
import { ProjectListResolver } from './projects/project-list-resolver.service'
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';


const routes: Routes = [
    
    { 
        path: 'slider', 
        component: SliderComponent,
        resolve: {projects: ProjectListResolver}
    },
    {
        path: 'projects', 
        data: { preload: true },
        loadChildren: 'app/projects/project.module#ProjectModule',
        resolve: {projects: ProjectListResolver}
    },
     { 
        path: 'about', 
        component: AboutComponent,
    },
     { 
        path: 'contact', 
        component: ContactComponent,
    },
    { path: '', pathMatch: 'full', redirectTo: 'slider'},
    { path: '**', pathMatch: 'full', redirectTo: 'slider'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: true, preloadingStrategy: SelectiveStrategy} )],
    providers: [ 
        SelectiveStrategy
         ],
    exports: [RouterModule]

})
export class AppRoutingModule {}

export const routableComponents = [
    SliderComponent
];