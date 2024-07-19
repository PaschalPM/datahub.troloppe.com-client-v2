import { Component, Input } from '@angular/core';
import { FacebookIconComponent } from '../svgs/facebook-icon.component';
import { InstagramIconComponent } from '../svgs/instagram-icon.component';
import { LinkedinIconComponent } from '../svgs/linkedin-icon.component';

@Component({
  selector: 'app-social-links-footer',
  standalone: true,
  imports: [
    FacebookIconComponent,
    InstagramIconComponent,
    LinkedinIconComponent,
  ],
  template: `
    <div [class]="clx">
      <a href="https://www.facebook.com/troloppeproperty/" [class]="_clx">
        <facebook-icon></facebook-icon>
      </a>
      <a
        href="https://www.instagram.com/troloppepropertyservices/?hl=en"
        [class]="_clx"
      >
        <instagram-icon></instagram-icon>
      </a>
      <a
        href="https://www.linkedin.com/company/troloppe-property-services/?originalSubdomain=ng"
        [class]="_clx"
      >
        <linkedin-icon></linkedin-icon>
      </a>
    </div>
  `,
})
export class SocialLinksFooterComponent {
  @Input() clx = '';
  _clx = 'hover:text-base-content active:text-base-content/70 transition-all';
}
