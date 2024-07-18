import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { menuSlideInOut } from '@shared/animations';
import { MenuService } from '@shared/services/menu.service';
import { UtilsService } from '@shared/services/utils.service';
import { BrandLogoComponent } from '../brand-logo/brand-logo.component';
import { MyMatIconComponent } from '../my-mat-icon/my-mat-icon.component';
import { ColorSchemeSideMenuComponent } from '../color-scheme-side-menu/color-scheme-side-menu.component';
import { GithubIconComponent } from '../svgs/github-icon.component';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [
    CommonModule,
    BrandLogoComponent,
    MyMatIconComponent,
    ColorSchemeSideMenuComponent,
    GithubIconComponent,
  ],
  templateUrl: './side-menu.component.html',
  animations: [menuSlideInOut()],
})
export class SideMenuComponent {
  constructor(public menuService: MenuService, public utils: UtilsService) {}
}
