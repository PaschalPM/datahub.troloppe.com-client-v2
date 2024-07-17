import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandLogoComponent } from '@shared/components/brand-logo/brand-logo.component';
import { UserActionBtnComponent } from '@core/components/base/user-action-btn/user-action-btn.component';
import { ColorSchemeComponent } from '@shared/components/color-scheme/color-scheme.component';
import { ContainerComponent } from "@shared/components/container/container.component";

@Component({
  selector: 'base-navbar',
  standalone: true,
  imports: [
    RouterModule,
    BrandLogoComponent,
    UserActionBtnComponent,
    ColorSchemeComponent,
    ColorSchemeComponent,
    ContainerComponent
],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {}
