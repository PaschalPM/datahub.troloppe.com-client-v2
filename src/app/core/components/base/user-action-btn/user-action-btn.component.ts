import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'user-action-btn',
  standalone: true,
  imports: [RouterLink],
  template: `
    @if(currentUser){ @if (region === 'nav'){
    <a routerLink="/dashboard" class="btn btn-circle uppercase">P</a>
    } @else {
    <a routerLink="/dashboard" class="btn btn-secondary"> Go To Dashboard </a>
    } } @else { @if (region === 'nav'){
    <a routerLink="/sign-in" class="btn">Sign In</a>
    } @else {
    <a routerLink="/sign-in" class="btn btn-secondary"> Sign In </a>
    } }
  `,
})
export class UserActionBtnComponent {
  @Input() region: 'nav' | 'body' = 'nav';
  currentUser = true;
}
