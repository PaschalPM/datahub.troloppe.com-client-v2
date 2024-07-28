import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { User } from '@shared/services/types';
import { UtilsService } from '@shared/services/utils.service';
import { Subscription } from 'rxjs';

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
      >
        {{ utils.getInitialOfUser(currentUser.name) }}</a
      >
      } @else {
      <a routerLink="/dashboard" class="btn btn-secondary"> Go To Dashboard </a>
      } } @else { @if (region === 'nav'){
      <a routerLink="/sign-in" class="btn">Sign In</a>
      } @else {
      <a routerLink="/sign-in" class="btn btn-secondary px-8"> Sign In </a>
      } }
    </span>
  `,
})
export class UserActionBtnComponent {
  @Input() region: 'nav' | 'body' = 'nav';
  @Input() clx = '';
  currentUser!: User | null;

  private authCurrentUserSubscription!: Subscription;

  constructor(public utils: UtilsService, public authService: AuthService) {}

  ngOnInit(): void {
    this.authCurrentUserSubscription = this.authService
      .onCurrentUser()
      .subscribe((value) => {
        this.currentUser = value;
      });
  }

  ngOnDestroy(): void {
    this.authCurrentUserSubscription.unsubscribe();
  }
}
