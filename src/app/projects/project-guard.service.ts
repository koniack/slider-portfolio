import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';

import { ProjectEditComponent } from './project-edit.component';

@Injectable()
export class ProjectEditGuard implements CanDeactivate<ProjectEditComponent> {
    canDeactivate(component: ProjectEditComponent): boolean {
        if (component.isDirty) {
            let projectName = component.project.name || 'New Project';
            return confirm(`Navigate away and lose all changes to ${projectName}?`);
        }
        return true;
    }
}