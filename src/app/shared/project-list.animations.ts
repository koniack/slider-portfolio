import {sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild, useAnimation } from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);
import { fadeAnimation } from './animations';

export const projectListTransition = 
  trigger('projectListTransition', [
      transition(':enter', [
        query('.column', [
          useAnimation(fadeAnimation, {
            params: {
              opacityFrom: 0,
              opacityTo: 1,
              translate3dFrom: 'translate3d(0,5%,0)',
              translate3dTo: 'translate3d(0,0,0)',
              time: '500ms'
            }
          })
        ])
      ]),
      transition(':leave', [
        query('.column', [
          useAnimation(fadeAnimation, {
            params: {
              opacityFrom: 1,
              opacityTo: 0,
              translate3dFrom: 'translate3d(0,0,0)',
              translate3dTo: 'translate3d(0,5%,0)',
              time: '500ms'
            }
          })
        ])
      ])
  ]);