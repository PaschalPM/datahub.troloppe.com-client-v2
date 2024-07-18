import { animate, style, transition, trigger } from '@angular/animations';

export const fadeInOut = () => {
  return trigger('fadeInOut', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 })),
    ]),
    transition(':leave', [
      style({ opacity: 1 }),
      animate('150ms', style({ opacity: 0 })),
    ]),
  ]);
};

export const menuSlideInOut = () => {
  return trigger('menuSlideInOut', [
    transition(':enter', [
      style({ transform: 'translateX(-100%)' }),
      animate('.35s', style({ transform: 'translateX(0)' })),
    ]),
    transition(':leave', [
       style({ transform: 'translateX(0%)' }),
       animate('.15s', style({ transform: 'translateX(-100%)' })),
    ]),
  ]);
};
