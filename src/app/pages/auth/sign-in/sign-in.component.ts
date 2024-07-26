import { Component } from '@angular/core';
import { routeFadeInOut } from '@shared/animations';
import { LoginBoxComponent } from '../partials/login-box/login-box.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [LoginBoxComponent],
  template: `
    <div
      class="relative z-10 m-auto w-full flex max-w-[500px] items-center bg-base-100  lg:min-h-[430px] lg:max-w-[845px] lg:shadow-lg "
    >
      <div class="w-full flex items-center">
        <div class="basis-[55%] grow lg:ml-5">
          <auth-login-box></auth-login-box>
        </div>
        <div class="divider lg:divider-horizontal"></div>
        <div class="hidden basis-[45%] grow lg:flex">
          <img
            src="assets/PasswordImage.png"
            alt="PasswordImage"
            class="mx-auto"
          />
        </div>
      </div>
    </div>
  `,
  animations: [routeFadeInOut],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class SignInComponent {}
