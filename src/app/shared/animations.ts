import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('150ms', style({ opacity: 0 })),
  ]),
]);

export const sideMenuTrigger = trigger('sideMenuTrigger', [
  transition(':enter', [
    query('#menu-bar', [style({ transform: 'translateX(-100%)' })]),
    group([
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 })),
      query('#menu-bar', [animate('350ms 100ms')]),
    ]),
  ]),
  transition(':leave', [
    query('#menu-bar', [
      animate('150ms', style({ transform: 'translateX(-100%)' })),
    ]),
    animate('150ms', style({ opacity: 0 })),
  ]),
]);

export const routeFadeInOut = trigger('routeFadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('300ms ease-in', style({ opacity: 1 })),
  ]),
  transition(':leave', [
    style({ opacity: 1, position: 'fixed', width: '100%', height: '86vh' }),
    animate(
      '150ms ease-out',
      style({ opacity: 0, transform: 'translateX(-100%)' })
    ),
  ]),
]);

