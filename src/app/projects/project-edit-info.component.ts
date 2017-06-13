import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

import { IProject } from './project';

@Component({
    moduleId: module.id,
    templateUrl: 'project-edit-info.component.html'
})
export class ProjectEditInfoComponent implements OnInit {
    @ViewChild(NgForm) projectForm: NgForm;

    errorMessage: string;
    project: IProject;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.parent.data.subscribe(data => {
            this.project = data['project'];

            if (this.projectForm) {
                this.projectForm.reset();
            }
        });
    }
}