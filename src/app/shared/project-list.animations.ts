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
  useAnimation } from '@angular/animations';
// const query = (s, a, o= {optional: true}) => q(s, a, o);
import { fadeAnimation } from './animations';

export const projectListTransition =
  trigger('projectListTransition', [
      transition(':enter', [
        query('.column', stagger( 200, [
          useAnimation(fadeAnimation, {
            params: {
              opacityFrom: 0,
              opacityTo: 1,
              translate3dFrom: 'translate3d(0,0,0)',
              translate3dTo: 'translate3d(0,0,0)',
              time: '300ms'
            }
          })
        ]))
      ]),
      transition(':leave', [
        query('.column', stagger( -200, [
          useAnimation(fadeAnimation, {
            params: {
              opacityFrom: 1,
              opacityTo: 0,
              translate3dFrom: 'translate3d(0,0,0)',
              translate3dTo: 'translate3d(0,0,0)',
              time: '300ms'
            }
          })
        ]))
      ])
  ]);
