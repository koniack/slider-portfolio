import { InMemoryDbService, InMemoryBackendConfig } from 'angular-in-memory-web-api';

import { IProject } from './project';

export class ProjectData implements InMemoryDbService, InMemoryBackendConfig {
    createDb() {
        let projects: IProject[] = [
            {
                'id': 1, 
                'name': 'Project 1', 
                'thumbUrl':
                {
                        'url': 'assets/img/proj1-thumb.png',
                        'width': 300,
                        'height': 300
                }
                ,
                'category': 'Web Design',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['leaf', 'yard', 'home']
            },
            {
                'id': 2, 
                'name': 'Project 2', 
                'thumbUrl':
                   {
                        'url': 'assets/img/proj2-thumb.png',
                        'width': 300,
                        'height': 300
                    }
                ,                'category': 'Branding',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['leaf', 'yard', 'home']
            },
            {
                'id': 3,
                'name': 'Project 3', 
                'thumbUrl':
                    {
                        'url': 'assets/img/proj3-thumb.png',
                        'width': 300,
                        'height': 300
                    }
                ,                'category': 'Logo Design',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['leaf', 'yard', 'home']
            },
            {
                'id': 4, 
                'name': 'Project 4', 
                'thumbUrl':
                    {
                        'url': 'assets/img/proj4-thumb.png',
                        'width': 300,
                        'height': 300
                    }
                ,                
                'category': 'Web Design, Logo Design',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['leaf', 'yard', 'home']
            },
            {
                'id': 5, 
                'name': 'Project 5', 
                'thumbUrl':
                    {
                        'url': 'assets/img/proj5-thumb.png',
                        'width': 300,
                        'height': 300
                    }
                ,                
                'category': 'Branding, Web Design',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['leaf', 'yard', 'home']
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