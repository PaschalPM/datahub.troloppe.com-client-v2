import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [RouterModule],
  template: `
  <a routerLink="/">
    <img src="assets/SunsetDataHUBLogo.svg" alt="datahub.troloppe.com" />
  </a>`,
})
export class BrandLogoComponent {

}
