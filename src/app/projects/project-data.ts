import { InMemoryDbService, InMemoryBackendConfig } from 'angular-in-memory-web-api';

import { IProject } from './project';

export class ProjectData implements InMemoryDbService, InMemoryBackendConfig {
    createDb() {
        const projects: IProject[] = [
            {
                'id': 1,
                'name': 'Delta Blood Bank',
                'thumbUrl':
                    {
                        'url': 'assets/img/dbb-macbook.jpg',
                        'width': 4096,
                        'height': 3068,
                        'caption': ''
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/dbb-brand.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Brand Identity Style Guide'
                    },
                    {
                        'url': 'assets/img/dbb-typeface.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Typeface'
                    },
                    {
                        'url': 'assets/img/dbb-colors.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Colors'
                    },
                    {
                        'url': 'assets/img/dbb-stationary.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/dbb-brochure.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/dbb-brochure-back.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/dbb-shirt.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/dbb-ui-section.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'User Interface'
                    },
                    {
                        'url': 'assets/img/dbb-web-full.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/dbb-mobile-ui.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Mobile User Interface'
                    }
                ],
                'category': 'Brand Identity, UI Design and Development',
                'description': 'Magazine depicting life of local creatives.',
                'tags': ['Brand', 'UI', 'Design', 'Develop']
            },
            {
                'id': 2,
                'name': 'Tarantino Film Festival',
                'thumbUrl':
                   {
                        'url': 'assets/img/proj2-1.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the thumbnail of this project.'
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/proj2-1.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the first picture in this project.'
                    }
                ],
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
                        'height': 2592,
                        'caption': 'This is the thumbnail of this project.'
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/proj3-1.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the first picture in this project.'
                    },
                    {
                        'url': 'assets/img/proj3-2.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the second picture in this project.'
                    }
                ],
                'category': 'Book Cover Design',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['Book', 'Cover', 'home']
            },
            {
                'id': 4,
                'name': 'Intelligent Design',
                'thumbUrl':
                    {
                        'url': 'assets/img/proj4-1.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the thumbnail of this project.'
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/proj4-1.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the first picture in this project.'
                    }
                ],
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
                        'height': 792,
                        'caption': 'This is the thumbnail of this project.'
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/proj5-1.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the first picture in this project.'
                    }
                ],
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
                        'height': 300,
                        'caption': 'This is the thumbnail of this project.'
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/proj6-thumb.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the first picture in this project.'
                    }
                ],
                'category': 'Branding, Web Design, Logo Design',
                'description': 'Leaf rake with 48-inch wooden handle.',
                'tags': ['leaf', 'yard', 'home']
            }
        ];
        return { projects };
    }
}
