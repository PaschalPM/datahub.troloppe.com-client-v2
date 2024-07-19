import { Component } from '@angular/core';

@Component({
  selector: 'facebook-icon',
  standalone: true,
  imports: [],
  template: `
    <svg
      width="10"
      height="20"
      viewBox="0 0 23 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.875 22.6875V44.4375C4.875 44.8125 5.0625 45 5.4375 45H14.0625C14.4375 45 14.625 44.8125 14.625 44.4375V22.3125H21C21.375 22.3125 21.5625 22.125 21.5625 21.75L22.125 15C22.125 14.625 21.9375 14.4375 21.5625 14.4375H14.625V9.75C14.625 8.625 15.5625 7.6875 16.875 7.6875H21.75C22.3125 7.6875 22.5 7.5 22.5 7.125V0.5625C22.5 0.1875 22.3125 0 21.9375 0H13.6875C8.8125 0 4.875 3.5625 4.875 8.0625V14.4375H0.5625C0.1875 14.4375 0 14.625 0 15V21.75C0 22.125 0.1875 22.3125 0.5625 22.3125H4.875V22.6875Z"
        fill="currentcolor"
      />
    </svg>
  `,
  styles: `
  :host {
    display: contents
  }
`,
})
export class FacebookIconComponent {}
