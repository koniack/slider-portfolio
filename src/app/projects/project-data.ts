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
                        'caption': ''
                    }
                ],
                'category': 'Brand Identity, UI Design and Development',
                'problem': 'Develop a clear, consistent, and concise brand identity system for a nonprofit organization.',
                'solution': 'Delta Blood Bank did not want to drastically change their existing logo. So I just refined it slightly for balance and legibility. I built a strong branding system around it that utilized a consistent color palette and typeface. A brand identity guide was developed to ensure that staff understood and implemented the new brand identity system.\n\nI also redesigned their website. I simplified their content, integrated and emphasized social media, and made it easier for donors to schedule an appointment online. WordPress was also integrated for an easier Content Management System.', 
                'tags': ['Illustrator', 'Photoshop', 'InDesign', 'HTML', 'SASS/CSS', 'Javascript', 'Angular','GSAP(GreenSock)','ScrollMagic', 'WordPress']
            },
            {
                'id': 2,
                'name': 'Teaching Institute',
                'thumbUrl':
                   {
                        'url': 'assets/img/ti-thumb.jpg',
                        'width': 4096,
                        'height': 2788,
                        'caption': 'This is the thumbnail of this project.'
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/ti-process.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Research and Development'
                    },
                    {
                        'url': 'assets/img/ti-logo.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Final Logo'
                    },
                    {
                        'url': 'assets/img/ti-type.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Typeface'
                    },
                    {
                        'url': 'assets/img/ti-color-section.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Colors'
                    },
                    {
                        'url': 'assets/img/ti-stationary.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/ti-mug.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/ti-shirt.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/ti-imac.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'User Interface'
                    },
                    {
                        'url': 'assets/img/ti-mobile.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                ],
                'category': 'Logo Design, Brand Identity, User Interface',
                'problem': 'Develop a logo and brand identity for CSU Sacramento’s Teaching Institute commemorating the 10 year annniversary of the organization.',
                'solution': 'The Teaching Institute\'s mission is to help faculty achieve their desired level of teaching excellence. It is there to support faculty and provide them with the tools and skills necessary to help them grow and thrive. The symbol I designed emphasizes support, growth, and success. Support is represented by the base of the book. The repetition of the turning pages portrays growth. The spark, created in the negative space of the books turning pages, symbolizes success and excellence.',
                'tags': ['Indesign', 'Illustrator', 'Sketch']
            },
            {
                'id': 3,
                'name': 'The Godfather',
                'thumbUrl':
                    {
                        'url': 'assets/img/gf-thumb-crop.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'This is the thumbnail of this project.'
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/gf-storyboard.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Original Storyboard'
                    },
                    {
                        'url': 'assets/img/kone_storyboard01.gif',
                        'width': 3872,
                        'height': 2592,
                        'caption': null
                    },
                ],
                'video':    '307916497',
                'category': 'Motion Design',
                'problem': 'Develop a new and engaging animated title sequence for The Godfather movie without using any images, music or typefaces from the original film.',
                'solution': 'I chose to use the metaphor of ink staining an old parchment paper to symbolize how a persons associates and environment can influence and corrupt an individuals morals. The abstract imagery i chose also hints at significant developments in the movie.',
                'tags': ['Storyboard', 'After Effects', 'Animation']
            },
            {
                'id': 4,
                'name': 'Ascend Magazine',
                'thumbUrl':
                    {
                        'url': 'assets/img/am-cover-crop.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/am-cover.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/am-toc.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/am-rhad.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/am-fbad.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/am-dim.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                ],
                'category': 'Editorial Design',
                'problem': 'Develop a magazine to promote specific neighborhoods within San Francisco to creative professionals in an effort to persuade them to relocate there.',
                'solution': 'This magazine was designed to promote San Francisco\'s Financial District neighborhood. The aesthetic of the magazine is simple, clean, and contemporary. This aesthetic was specifically chosen to appeal to the young, successful, creative professional who would be interested in living in this area of San Francisco.',
                'tags': ['InDesign', 'Illustrator', 'Photography', 'Typography', 'Printing']
            },
            {
                'id': 5,
                'name': 'Dune Special Edition',
                'thumbUrl':
                    {
                        'url': 'assets/img/dune-cover.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/dune-cover.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/dune-2.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/dune-type.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/dune-inner.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    }
                ],
                'category': 'Book Design',
                'problem': 'Redesign an old novel to appeal to modern consumers and book enthusiasts.',
                'solution': 'I redesigned the science fiction novel Dune by focusing on the scarcest element on the planet, water. I depicted water as a beautiful and mystical resource. Upon closer inspection sand dunes, the most abundant geographical phenomena are also suggested in the treatment of the cover. I also applied a special type treatment to the title that reflects the alien yet tribal nature of the native civilizations on the planet. ',
                'tags': ['Photoshop', 'Illustrator', 'InDesign', 'Typography']
            },
            {
                'id': 6,
                'name': 'Selected Posters',
                'thumbUrl':
                    {
                        'url': 'assets/img/id-mock-crop.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                'projectPics': [
                    {
                        'url': 'assets/img/id-mock.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'CSU Sacramento Annual Spring Show'
                    },
                    {
                        'url': 'assets/img/qt-mock.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Quentin Tarantino Film Festival'
                    },
                    {
                        'url': 'assets/img/env-mock.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Envision Design Conference'
                    }
                ],
                'category': 'Visual Communication',
                'problem': '',
                'solution': '',
                'tags': null
            }
        ];
        return { projects };
    }
}
