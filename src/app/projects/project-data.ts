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
                'description': 'When I first began working with Delta Blood Bank they had several versions of their logo that used different typefaces and colors. Although it was not financially feasible to rebrand the entire organization I was able to narrow their logo down to one logo that was already being utilized on a majority of their products and built a consistent and imactful branding system around it which utilized a consistent typeface and color palette. Overall this increased Delta Blood Bank’s Identity brand presence both physically with printed material as well as digitally with their online presence. I also redesigned their entire website and integrated Wordpress for an easier Content Management System. Simplified their website and only displayed relevant materials. Integrated Social Media and made it much easier for donors to schedule an appointment to donate.',
                'tags': ['Brand', 'UI', 'Design', 'Develop']
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
                        'url': 'assets/img/ti-logo.png',
                        'width': 3872,
                        'height': 2592,
                        'caption': 'Logo Design'
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
                        'url': 'assets/img/ti-process.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
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
                        'caption': ''
                    },
                    {
                        'url': 'assets/img/ti-mobile.jpg',
                        'width': 3872,
                        'height': 2592,
                        'caption': ''
                    },
                ],
                'category': 'Logo Design, Brand Identity, User Interface',
                'description': 'The buying of large-screen TVs has absolutely skyrocketed lately. It seems that everyone wants one – and with good reason. The large-screen TV has come a long way from those faded-out behemoths of old that took up half your living room and never really produced a picture of decent quality. Now, however, especially in combination with HDTV, you can get not only a nice, large picture, but a crisp, clean one too.',
                'tags': ['Logo', 'Branding', 'User Interface']
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
                'description': 'Problem: Develop a new and engaging animated title sequence for The Godfather movie without using any images, music or typefaces from the original film. Solution: I chose to use the metaphor of ink staining an old parchment paper to symbolize how a persons associates and environment can corrupt and distort reality. The abstract imagery i chose also hints at significant developments of the movie.',
                'tags': ['Book', 'Cover', 'home']
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
                'description': 'Sacramento State annual spring show.',
                'tags': ['leaf', 'poster', 'home']
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
                'description': 'Sacramento State annual spring show.',
                'tags': ['leaf', 'poster', 'home']
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
                'category': 'Poster Design',
                'description': 'Sacramento State annual spring show.',
                'tags': ['leaf', 'poster', 'home']
            }
        ];
        return { projects };
    }
}
