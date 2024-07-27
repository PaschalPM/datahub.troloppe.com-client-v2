import { Component, Input } from '@angular/core';
import { RouteListComponent } from '@shared/components/route-list/route-list.component';
import { SideMenuComponent } from '@shared/components/side-menu/side-menu.component';
import { MenuTogglerIconComponent } from '@shared/components/svgs/menu-toggler-icon.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { MenuService } from '@shared/services/menu.service';
import { Observable } from 'rxjs';
import { UtilsService } from '@shared/services/utils.service';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { AuthService } from '@shared/services/auth.service';
import { NotificationsService } from '@core/services/dashboard/notifications.service';
import { User } from '@shared/services/types';
import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { dashboardRouteLists } from '@shared/services/constants/route-lists';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';

@Component({
  selector: 'dashboard-navbar',
  standalone: true,
  imports: [
    RouteListComponent,
    SideMenuComponent,
    MenuTogglerIconComponent,
    ContainerComponent,
    MyMatIconComponent,
    TitleCasePipe,
    AsyncPipe,
    ProfileDropdownComponent,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input({ required: true }) title = 'Home';
  isProfileDropdownOpen = false;
  currentUser$!: Observable<User | null>;

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  @Input() clx = '';

  // Route List Component has withHomeRoute set to false
  primaryRouteList: RouteType[] = dashboardRouteLists.primary;
  secondaryRouteList: RouteType[] = dashboardRouteLists.secondary;

  constructor(
    private menuService: MenuService,
    public utils: UtilsService,
    public ns: NotificationsService,
    public authService: AuthService
  ) {
    this.currentUser$ = this.authService.onCurrentUser();
  }

  toggleMenu() {
    this.menuService.toggleState();
  }
}
