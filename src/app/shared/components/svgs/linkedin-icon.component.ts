import { Component } from '@angular/core';

@Component({
  selector: 'linkedin-icon',
  standalone: true,
  imports: [],
  template: `
    <svg
      width="20"
      height="20"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_237_41)">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M60 60H48V39.0029C48 33.2429 45.459 30.0293 40.902 30.0293C35.943 30.0293 33 33.3779 33 39.0029V60H21V21H33V25.3857C33 25.3857 36.765 18.7793 45.249 18.7793C53.736 18.7793 60 23.9583 60 34.6743V60ZM7.326 14.7627C3.279 14.7627 0 11.4569 0 7.37988C0 3.30588 3.279 0 7.326 0C11.37 0 14.649 3.30588 14.649 7.37988C14.652 11.4569 11.37 14.7627 7.326 14.7627ZM0 60H15V21H0V60Z"
          fill="currentcolor"
        />
      </g>
      <defs>
        <clipPath id="clip0_237_41">
          <rect width="60" height="60" fill="white" />
        </clipPath>
      </defs>
    </svg>
  `,
  styles: `
   :host {
     display: contents
   }
 `,
})
export class LinkedinIconComponent {}
