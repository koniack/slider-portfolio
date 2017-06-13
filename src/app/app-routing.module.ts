import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';

import { AuthGuard } from './user/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';
import { SliderComponent }  from './slider/slider.component';
import { ProjectListResolver } from './projects/project-list-resolver.service'


const routes: Routes = [
    
    { 
        path: 'slider', 
        component: SliderComponent,
        resolve: {slides: ProjectListResolver}
    },
    {
        path: 'projects', 
        data: { preload: true },
        loadChildren: 'app/projects/project.module#ProjectModule'
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