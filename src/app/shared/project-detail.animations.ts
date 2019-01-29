import {
  sequence,
  trigger,
  stagger,
  animate,
  style,
  group,
  query,
  transition,
  keyframes,
  animateChild,
  useAnimation} from '@angular/animations';
// const query = (s, a, o= {optional: true}) => q(s, a, o);

import { fadeAnimation } from './animations'

export const projectDetailTransition =
  trigger('projectDetailTransition', [
      transition(':enter', [
        // query('h1, h2', style({ opacity: 0, transform: 'translateY(-100%)' })),
        sequence([
          query('.icon-scroll-container', style({opacity: 1})),
          query('.project-detail-content', [
            useAnimation(fadeAnimation, {
              params: {
              opacityFrom: 0,
              opacityTo: 1,
              translate3dFrom: 'translate3d(0,2.5%,0)',
              translate3dTo: 'translate3d(0,0,0)',
              time: '100ms'
              }
            })
          ])
          
         /* query('h1, h2', stagger(150, [
            style({ transform: 'translateY(100px)', opacity: 0 }),
            animate('500ms ease-out',
            style({transform: 'translateY(0)', opacity: 1})),
          ])),
          query('.line', [
            style({width: 0}),
            animate('800ms ease-out',
            style('*'))
          ])*/
        ])
      ]),
      transition(':leave', [
        sequence([
          /*query('.line', [
            style('*'),
            animate('800ms ease-out',
            style({width: 0}))
          ]),
          query('h1, h2', stagger(150, [
            style({ transform: 'translateY(0px)', opacity: 1 }),
            animate('500ms ease-out',
            style({transform: 'translateY(100px)', opacity: 0})),
          ])),*/
          query('.icon-scroll-container',
            style({opacity: 0})
          ),
          query('.project-detail-content', [
            useAnimation(fadeAnimation, {
              params: {
              opacityFrom: 1,
              opacityTo: 0,
              translate3dFrom: 'translate3d(0,0,0)',
              translate3dTo: 'translate3d(0,2.5%,0)',
              time: '300ms'
              }
            })
            ])
        ])
      ])
  ]);
