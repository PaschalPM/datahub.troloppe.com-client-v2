import {
  animate,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeInOut = trigger('fadeInOut', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('200ms', style({ opacity: 1 })),
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
    style({ opacity: 0, transform: 'translateX(-100%)' }),
    animate(
      '300ms ease-in',
      style({ opacity: 1, transform: 'translateX(0%)' })
    ),
  ]),
]);

export const inputErrorTrigger = trigger('inputErrorTrigger', [
  transition(':enter', [
    style({
      opacity: 0,
      marginTop: '-10px',
    }),
    animate(
      '150ms',
      style({
        opacity: 1,
        marginTop: '0px',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '150ms',
      style({
        opacity: 0,
        marginTop: '-10px',
      })
    ),
  ]),
]);

export const alertTrigger = trigger('alertTrigger', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-100px)',
    }),
    animate(
      '150ms',
      style({
        opacity: 1,
        transform: 'translateY(0px)',
      })
    ),
  ]),
  transition(':leave', [
    animate(
      '150ms',
      style({
        opacity: 0,
        transform: 'translateY(-100px)',
      })
    ),
  ]),
]);

export const modalTrigger = trigger('modalTrigger', [
  transition(':enter', [
    query('#modal-container', [style({ transform: 'scale(0%)' })]),
    group([
      style({ opacity: 0 }),
      animate('300ms', style({ opacity: 1 })),
      query('#modal-container', [animate('350ms 100ms')]),
    ]),
  ]),
  transition(':leave', [
    query('#modal-container', [
      animate('150ms', style({ transform: 'scale(0%)' })),
    ]),
    animate('150ms', style({ opacity: 0 })),
  ]),
]);

export const visibleTrigger = trigger('visibleTrigger', [
  state(
    'visible',
    style({
      opacity: 1,
    })
  ),
  transition('* => visible', [
    style({ opacity: 0 }),
    animate('500ms ease-in', style({ opacity: 1 })),
  ]),
]);
