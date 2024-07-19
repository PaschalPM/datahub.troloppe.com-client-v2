import { Component } from '@angular/core';

@Component({
  selector: 'instagram-icon',
  standalone: true,
  imports: [],
  template: `
    <svg
      width="20"
      height="20"
      viewBox="0 0 61 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M30.2405 0.519531C22.0956 0.519531 21.0743 0.554055 17.8755 0.700008C14.6833 0.845603 12.5032 1.35263 10.5956 2.09405C8.62345 2.86037 6.95095 3.88585 5.28358 5.5531C3.6163 7.22047 2.59083 8.89297 1.82452 10.8651C1.0831 12.7727 0.576072 14.9529 0.430476 18.145C0.284524 21.3438 0.25 22.3651 0.25 30.5102C0.25 38.655 0.284524 39.6762 0.430476 42.8752C0.576072 46.0672 1.0831 48.2475 1.82452 50.155C2.59083 52.1272 3.6163 53.7997 5.28358 55.467C6.95095 57.1342 8.62345 58.1598 10.5956 58.9263C12.5032 59.6675 14.6833 60.1745 17.8755 60.3203C21.0743 60.466 22.0956 60.5005 30.2405 60.5005C38.3855 60.5005 39.4067 60.466 42.6055 60.3203C45.7977 60.1745 47.9778 59.6675 49.8855 58.9263C51.8575 58.1598 53.53 57.1342 55.1975 55.467C56.8648 53.7997 57.8902 52.1272 58.6567 50.155C59.398 48.2475 59.905 46.0672 60.0505 42.8752C60.1965 39.6762 60.231 38.655 60.231 30.5102C60.231 22.3651 60.1965 21.3438 60.0505 18.145C59.905 14.9529 59.398 12.7727 58.6567 10.8651C57.8902 8.89297 56.8648 7.22047 55.1975 5.5531C53.53 3.88585 51.8575 2.86037 49.8855 2.09405C47.9778 1.35263 45.7977 0.845603 42.6055 0.700008C39.4067 0.554055 38.3855 0.519531 30.2405 0.519531ZM20.2437 30.5102C20.2437 36.0312 24.7194 40.507 30.2405 40.507C35.7617 40.507 40.2375 36.0312 40.2375 30.5102C40.2375 24.9889 35.7617 20.5132 30.2405 20.5132C24.7194 20.5132 20.2437 24.9889 20.2437 30.5102ZM14.84 30.5102C14.84 22.0045 21.735 15.1095 30.2405 15.1095C38.746 15.1095 45.641 22.0045 45.641 30.5102C45.641 39.0155 38.746 45.9105 30.2405 45.9105C21.735 45.9105 14.84 39.0155 14.84 30.5102ZM46.2495 18.0999C48.2372 18.0999 49.8485 16.4887 49.8485 14.5011C49.8485 12.5134 48.2372 10.9022 46.2495 10.9022C44.262 10.9022 42.6508 12.5134 42.6508 14.5011C42.6508 16.4887 44.262 18.0999 46.2495 18.0999Z"
        fill="currentcolor"
      />
    </svg>
  `,
  styles: `
    :host {
      display: contents
    }
  `
})
export class InstagramIconComponent {}