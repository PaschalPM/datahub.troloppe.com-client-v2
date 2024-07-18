import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrandLogoComponent } from '@shared/components/brand-logo/brand-logo.component';
import { UserActionBtnComponent } from '@core/components/base/user-action-btn/user-action-btn.component';
import { ColorSchemeComponent } from '@shared/components/color-scheme/color-scheme.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { SideMenuComponent } from '@shared/components/side-menu/side-menu.component';
import { MenuService } from '@shared/services/menu.service';
import { MenuTogglerIconComponent } from '@shared/components/svgs/menu-toggler-icon.component';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';

@Component({
  selector: 'base-navbar',
  standalone: true,
  imports: [
    RouterModule,
    BrandLogoComponent,
    UserActionBtnComponent,
    ColorSchemeComponent,
    ColorSchemeComponent,
    ContainerComponent,
    SideMenuComponent,
    MenuTogglerIconComponent,
    MyMatIconComponent
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(public menuService: MenuService) {}
}
