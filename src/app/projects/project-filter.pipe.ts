import { PipeTransform, Pipe } from '@angular/core';

import { IProject } from './project';

@Pipe({
	name: 'projectFilter'
})

export class ProjectFilterPipe implements PipeTransform {

	transform(value: IProject[], filterBy: string): IProject[] {
		if (value == null) {
      		return null;
    	}
		filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
		return filterBy ? value.filter((project: IProject) =>
			project.category.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;

	}
}
