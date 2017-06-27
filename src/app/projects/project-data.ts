import { InMemoryDbService, InMemoryBackendConfig } from 'angular-in-memory-web-api';

import { IProject } from './project';

export class ProjectData implements InMemoryDbService, InMemoryBackendConfig {
    createDb() {
        let projects: IProject[] = [
            {
                'id': 1, 
                'name': 'Ascend Magazine', 
                'thumbUrl':
                {
                        'url': 'assets/img/proj1-1.jpg',
                        'width': 3872,
                        'height': 2592
                }
                ,
                'category': 'Editorial',
                'description': 'Magazine depicting life of local creatives.',
                'tags': ['Editorial', 'yard', 'home']
            },
            {
                'id': 2, 
                'name': 'Quentin Tarantino Film Festival', 
                'thumbUrl':
                   {
                        'url': 'assets/img/proj2-1.jpg',
                        'width': 3872,
                        'height': 2592
                    }
                ,                
                'category': 'Branding',
                'description': 'Film festival featuring Quentin Tarantino movies.',
                'tags': ['leaf', 'Branding', 'home']
            },
            {
                'id': 3,
                'name': 'Dune', 
                'thumbUrl':
                    {
                        'url': 'assets/img/proj3-1.jpg',
                        'width': 3872,
                        'height': 2592
                    }
                ,                
                'category': 'Book Cover Design',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['Book', 'Cover', 'home']
            },
            {
                'id': 4, 
                'name': 'intelligent Design', 
                'thumbUrl':
                    {
                        'url': 'assets/img/proj4-1.jpg',
                        'width': 3872,
                        'height': 2592
                    }
                ,                
                'category': 'Poster Design',
                'description': 'Sacramento State annual spring show.',
                'tags': ['leaf', 'poster', 'home']
            },
            {
                'id': 5, 
                'name': 'Teaching Institute', 
                'thumbUrl':
                    {
                        'url': 'assets/img/proj5-1.jpg',
                        'width': 612,
                        'height': 792
                    }
                ,                
                'category': 'Branding, Logo Design',
                'description': 'Teaching Institute 10th anniversary design.',
                'tags': ['leaf', 'poster', 'home']
            },
            {
                'id': 6, 
                'name': 'Project 6', 
                'thumbUrl':
                    {
                        'url': 'assets/img/proj6-thumb.png',
                        'width': 300,
                        'height': 300
                    }
                ,                
                'category': 'Branding, Web Design, Logo Design',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['leaf', 'yard', 'home']
            }
        ];
        return { projects };
    }
}