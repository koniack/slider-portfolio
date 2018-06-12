import {animation, style, animate} from '@angular/animations';
export let fadeAnimation = animation([
  style({ opacity: '{{ opacityFrom }}', transform: '{{ translate3dFrom }}' }),
  animate('{{ time }}', style({ opacity: '{{ opacityTo }}', transform: '{{ translate3dTo }}' }))
], {params: {
    opacityFrom: 0,
    opacityTo: 1,
    translate3dFrom: 'translate3d(0,5%,0)',
    translate3dTo: 'translate3d(0,0,0)',
    time: '500ms' }
    }
);
