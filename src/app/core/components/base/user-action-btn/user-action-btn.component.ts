import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-action-btn',
  standalone: true,
  imports: [RouterLink],
  template: `
    <span [class]="clx">
      @if(currentUser){ @if (region === 'nav'){
      <a
        routerLink="/dashboard"
        class="btn btn-circle uppercase bg-base-100 font-bold border border-base-300"
        >P</a
      >
      } @else {
      <a routerLink="/dashboard" class="btn btn-secondary"> Go To Dashboard </a>
      } } @else { @if (region === 'nav'){
      <a routerLink="/sign-in" class="btn">Sign In</a>
      } @else {
      <a routerLink="/sign-in" class="btn btn-secondary"> Sign In </a>
      } }
    </span>
  `,
})
export class UserActionBtnComponent {
  @Input() region: 'nav' | 'body' = 'nav';
  @Input() clx = '';
  currentUser = true;
}
