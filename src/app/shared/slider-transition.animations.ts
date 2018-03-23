import {sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild} from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

export const sliderTransition = 
    trigger('sliderTransition', [
        transition(':leave', [
          sequence([
            group([
              query('.dots a', stagger( 100, [
                style('*'),
                animate('500ms cubic-bezier(0.95, 0.05, 0.795, 0.035)',
                style({transform: 'translate3d(-300%,0,0)'}))
              ])),
              query('#prev-button, #next-button', stagger(100, [
                style('*'),
                animate('500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                style({transform: 'scale(0)'}))
              ]))
            ]),
            query('.proj-title', [
              style('*'),
              animate('500ms cubic-bezier(0.95, 0.05, 0.795, 0.035)',
              style({transform: 'translate3d(-100%,0,0)'}))
            ]),
            /*query('.active', [
              style('*'),
              animate('500ms ease-out', 
              style({width: '100%', height: '100%' })),
            ])*/
          ])
        ]),
        transition(':enter', [
          sequence([
            /*query('.active', [
              style({width: '100%', height: '100%' }),
              animate('500ms ease-out', 
              style('*')),
            ]),*/
            query('.proj-title', [
              style({transform: 'translate3d(-100%,0,0)'}),
              animate('500ms ease-out',
              style('*'))
            ]),
            group([
              query('.dots a', stagger( 100, [
                style({transform: 'translate3d(-300%,0,0)'}),
                animate('500ms ease-out',
                style('*'))
              ])),
              query('#prev-button, #next-button',stagger(100, [
                style({transform: 'scale(0)'}),
                animate('500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                style('*'))
              ]))
            ])
          ])
        ])
    ])