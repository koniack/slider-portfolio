/* Defines the project entity */
import {IProjectPicture} from './project-picture';

export interface IProject {
	id: number;
	name: string;
	thumbUrl:
		{
			url: string,
			width: number,
			height: number,
			caption: string
		}
	;
	projectPics: IProjectPicture[];
	video?: string;
	category: string;
	problem: string;
	solution: string;
	tags?: string[];
}
