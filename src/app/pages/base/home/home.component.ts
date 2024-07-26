import { Component } from '@angular/core';
import { UserActionBtnComponent } from '@core/components/base/user-action-btn/user-action-btn.component';
import { FacebookIconComponent } from '@shared/components/svgs/facebook-icon.component';
import { InstagramIconComponent } from '@shared/components/svgs/instagram-icon.component';
import { LinkedinIconComponent } from '@shared/components/svgs/linkedin-icon.component';
import { SocialLinksFooterComponent } from '@shared/components/social-links-footer/social-links-footer.component';
import { routeFadeInOut } from '@shared/animations';

@Component({
  selector: 'base-home-page',
  standalone: true,
  imports: [
    UserActionBtnComponent,
    FacebookIconComponent,
    InstagramIconComponent,
    LinkedinIconComponent,
    SocialLinksFooterComponent,
  ],
  templateUrl: './home.component.html',
  animations: [routeFadeInOut],
  host: {
    '[@routeFadeInOut]': 'true',
    '[style.display]': 'contents',
  },
})
export class HomeComponent {}
