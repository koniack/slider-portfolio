import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProject } from './project';

@Component({
    moduleId: module.id,
    templateUrl: 'project-edit-tags.component.html'
})
export class ProjectEditTagsComponent implements OnInit {
    errorMessage: string;
    newTags = '';
    project: IProject;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.project = data['project'];
        });
    }

    // Add the defined tags
    
    addTags(): void {
        let tagArray = this.newTags.split(',');
        this.project.tags = this.project.tags ? this.project.tags.concat(tagArray) : tagArray;
        this.newTags = '';
    }

    // Remove the tag from the array of tags.
    removeTag(idx: number): void {
        this.project.tags.splice(idx, 1);
    }
    

}