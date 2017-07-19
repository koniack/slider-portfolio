import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../messages/message.service';

import { IProject } from './project';
import { ProjectService } from './project.service';

@Component({
    moduleId: module.id,
    templateUrl: 'project-edit.component.html',
    styleUrls: ['project-edit.component.sass']
})
export class ProjectEditComponent implements OnInit {
    pageTitle: string = 'Project Edit';
    errorMessage: string;

    private currentProject: IProject;
    private originalProject: IProject;
    private dataIsValid: { [key: string]: boolean } = {};

    get isDirty(): boolean {
        return JSON.stringify(this.originalProject) !== JSON.stringify(this.currentProject);
    }

    get project(): IProject {
        return this.currentProject;
    }
    set project(value: IProject) {
        this.currentProject = value;
        // Clone the object to retain a copy
        this.originalProject = Object.assign({}, value);
    }

    constructor(private route: ActivatedRoute,
        private router: Router,
        private projectService: ProjectService,
        private messageService: MessageService) { }

    ngOnInit(): void {
        // Watch for changes to the resolve data
        this.route.data.subscribe(data => {
             this.onProjectRetrieved(data['project']);
        });
    }

    onProjectRetrieved(project: IProject): void {
        this.project = project;

        // Adjust the title
        if (this.project.id === 0) {
            this.pageTitle = 'Add Project';
        } else {
            this.pageTitle = `Edit Project: ${this.project.name}`;
        }
    }

    deleteProject(): void {
        if (this.project.id === 0) {
            // Don't delete, it was never saved.
            this.onSaveComplete(`${this.project.name} was deleted`);
        } else {
            if (confirm(`Really delete the project: ${this.project.name}?`)) {
                this.projectService.deleteProject(this.project.id)
                    .subscribe(
                        () => this.onSaveComplete(`${this.project.name} was deleted`),
                        (error: any) => this.errorMessage = <any>error
                    );
            }
        }
    }

    isValid(path: string): boolean {
        this.validate();
        if (path) {
            return this.dataIsValid[path];
        }
        return (this.dataIsValid &&
            Object.keys(this.dataIsValid).every(d => this.dataIsValid[d] === true));
    }

    saveProject(): void {
        if (this.isValid(null)) {
            this.projectService.saveProject(this.project)
                .subscribe(
                    () => this.onSaveComplete(`${this.project.name} was saved`),
                    (error: any) => this.errorMessage = <any>error
                );
        } else {
            this.errorMessage = 'Please correct the validation errors.';
        }
    }

    onSaveComplete(message?: string): void {
        if (message) {
            this.messageService.addMessage(message);
        }
        this.reset();
        // Navigate back to the project list
        this.router.navigate(['/projects']);
    }

    // Reset the data
    // Required after a save so the data is no longer seen as dirty.
    reset(): void {
        this.dataIsValid = null;
        this.currentProject = null;
        this.originalProject = null;
    }

    validate(): void {
        // Clear the validation object
        this.dataIsValid = {};

        // 'info' tab
        if (this.project.name &&
            this.project.name.length >= 3 &&
            this.project.id) {
            this.dataIsValid['info'] = true;
        } else {
            this.dataIsValid['info'] = false;
        }

        // 'tags' tab
        if (this.project.category &&
            this.project.category.length >= 3) {
            this.dataIsValid['tags'] = true;
        } else {
            this.dataIsValid['tags'] = false;
        }
    }

     initializeProject(): IProject {
        // Return an initialized object
        return {
            id: 0,
	        name: null,
	        thumbUrl: null,
            projectPics: [],
	        category: null,
            description: null,
            tags: []
            
        };
    }
}