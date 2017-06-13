/* Defines the project entity */

export interface IProject {
	id: number;
	name: string;
	thumbUrl: 
		{
			url: string,
			width: number,
			height: number
		}
	;
	category: string;
	description: string;
	tags?: string[];
}