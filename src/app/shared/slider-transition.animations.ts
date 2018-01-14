import {sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild} from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

export const sliderTransition = 
    trigger('sliderTransition', [
        transition(':leave', [
          sequence([
            query('.dots a', stagger( 100, [
              style('*'),
              animate('500ms cubic-bezier(0.95, 0.05, 0.795, 0.035)',
              style({transform: 'translateX(-300%)'}))
            ])),
            query('.proj-title', [
              style('*'),
              animate('500ms cubic-bezier(0.95, 0.05, 0.795, 0.035)',
              style({transform: 'translateX(-100%)'}))
            ]),
            query('.active', [
              style('*'),
              animate('500ms ease-out', 
              style({width: '100%', height: '100%' })),
            ]),
            query('#prev-button, #next-button', stagger(100, [
              style('*'),
              animate('500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              style({transform: 'scale(0)'}))
            ]))
          ])
        ]),
        transition(':enter', [
          sequence([
            query('.proj-title', [
              style({transform: 'translateX(-100%)'}),
              animate('500ms 300ms ease-out',
              style('*'))
            ]),
            query('.dots a', stagger( 100, [
              style({transform: 'translateX(-300%)'}),
              animate('500ms ease-out',
              style('*'))
            ])),
            query('#prev-button, #next-button',stagger(100, [
              style({transform: 'scale(0)'}),
              animate('500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
              style('*'))
            ]))
          ])
        ]),
        transition('* => projectDetail1', [
          query('#slider-area', [
            style('*'),
            animate('5000ms ease-out',
            style({border: 0}) )
          ])
        ])
    ])