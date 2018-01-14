import {sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild} from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

export const projectDetailTransition = 
  trigger('projectDetailTransition', [
      transition(':enter', [
        //query('h1, h2', style({ opacity: 0, transform: 'translateY(-100%)' })),
        group([
          query('h1, h2', stagger(200, [
            style({ transform: 'translateY(-100px)', opacity: 0 }),
            animate('500ms ease-out', 
            style({transform: 'translateY(0)', opacity: 1})),
          ])),
          query('.line', [
            style({width: 0}),
            animate('1s 900ms ease-out',
            style('*'))
          ])
        ])
      ]),
      transition(':leave', [
        sequence([ 
          query('.line', [
            style('*'),
            animate('500ms ease-out',
            style({width: 0}))
          ]),
          query('h1, h2', stagger(150, [
            style({ transform: 'translateY(0px)', opacity: 1 }),
            animate('250ms ease-out', 
            style({transform: 'translateY(-100px)', opacity: 0})),
          ]))
        ])  
      ])
  ]);