import {sequence, trigger, stagger, animate, style, group, query as q, transition, keyframes, animateChild} from '@angular/animations';
const query = (s,a,o={optional:true})=>q(s,a,o);

export const routerAnimation = 
trigger('routeAnimation', [
    transition('slider => projectDetail1, slider => projectDetail2, slider => projectDetail3, slider => projectDetail4, slider => projectDetail5, slider => projectDetail6', [
        query(':enter', style({opacity: 0})),
        query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
        sequence([
            query(':leave', animateChild()), 
            query('#slider-area', [
                style('*'),
                animate('1s ease-out', 
                style({transform: 'scale(1)'}))
            ]),
            group([
                query(':leave', [
                    style('*'),
                    animate('1s ease-in-out', 
                    style({ opacity: 0 })
                )]),
                query(':enter', [
                    style('*'),
                    animate('1s ease-in-out', 
                      style({ opacity: 1 })
                  )]),
            ]),
            query(':enter', animateChild())
        ])
    ]),
    transition('projectDetail1 => slider, projectDetail2 => slider, projectDetail3 => slider, projectDetail4 => slider, projectDetail5 => slider, projectDetail6 => slider', [
        query(':enter', style({opacity: 0})),
        query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
        sequence([ 
            query(':leave', animateChild()), 
            query('.thumb-container', [
                style('*'),
                animate('1s ease-out', 
                style({transform: 'scale(0.95)'}))
            ]),
            group([
                query(':leave', [
                    style({ opacity: 1 }),
                    animate('1s ease-in-out', 
                    style({ opacity: 0 })
                )]),
                query(':enter', [
                    style('*'),
                    animate('1s ease-in-out', 
                      style({ opacity: 1 })
                  )]),
            ]),
            query(':enter', animateChild())
        ])
    ]),
    transition('projects => *', [
        //query(':leave', animateChild()), 
        query(':enter', style({opacity: 0})),
        query(':leave, :enter', style({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 })),
        sequence([
          query(':leave', animateChild()), 
          group([
            query(':leave', [
              style({ opacity: 1 }),
              animate('1s ease-in-out', 
                style({ opacity: 0 })
            )]),
            query(':leave, :enter', style({position: 'fixed', width: '100%'})),
            query(':enter', [
              style({ opacity: 0 }),
              animate('1s ease-in-out', 
                style({ opacity: 1 })
            )]),
          ]),
          query(':enter', animateChild())
        ])
      ]),
    transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width:'100%' })),
        query(':enter', style({opacity: 0})),
        sequence([
          query(':leave', animateChild()), 
          group([
            query(':leave', [
              style({ opacity: 1 }),
              animate('1s ease-in-out', 
                style({ opacity: 0 })
            )]),
            query(':enter', [
              style({ opacity: 0 }),
              animate('1s ease-in-out', 
                style({ opacity: 1 })
            )]),
          ]),
          query(':enter', animateChild())
        ])
      ])
  ]);

/*
trigger('routeAnimation', [
    transition('* <=> *', [
        //style({ height: '!'}),
        query(':enter', style({ opacity: 0}), 
        { optional: true }),
        query(':enter, :leave', style({ position: 'absolute', top: 0, left: 0, right: 0})),
        sequence([
            query(':leave', animateChild()),
            group([
                query(':leave', [
                    style({ opacity: 0}), 
                    animate('1s cubic-bezier(.35, 0 , .25, 1)', 
                    style({ opacity: 1})
                ]),
                query(':enter', [
                    animate('1s cubic-bezier(.35, 0 , .25, 1)' , 
                    style({ opacity: 1}))
                ])
            ])
        ])
        
    ] )
]);
*/