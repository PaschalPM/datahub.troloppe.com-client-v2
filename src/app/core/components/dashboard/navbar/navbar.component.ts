import { Component, Input } from '@angular/core';
import { RouteListComponent } from '@shared/components/route-list/route-list.component';
import { SideMenuComponent } from '@shared/components/side-menu/side-menu.component';
import { MenuTogglerIconComponent } from '@shared/components/svgs/menu-toggler-icon.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { MenuService } from '@shared/services/menu.service';
import { Observable, Subscription } from 'rxjs';
import { UtilsService } from '@shared/services/utils.service';
import { MyMatIconComponent } from '@shared/components/my-mat-icon/my-mat-icon.component';
import { AuthService } from '@shared/services/auth.service';
import { NotificationsService } from '@core/services/dashboard/notifications.service';
import { User } from '@shared/services/types';
import { AsyncPipe, NgIf, TitleCasePipe } from '@angular/common';
import { dashboardRouteLists } from '@shared/services/constants/route-lists';
import { ProfileDropdownComponent } from '../profile-dropdown/profile-dropdown.component';
import { RouterModule } from '@angular/router';
import { PermissionService } from '@shared/services/permission.service';

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
    RouterModule,
  ],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input({ required: true }) title = 'Home';
  @Input() clx = '';
  isProfileDropdownOpen = false;
  currentUser$!: Observable<User | null>;

  // Route List Component has withHomeRoute set to false
  primaryRouteList!: RouteType[] ;
  secondaryRouteList!: RouteType[];

  private unreadCountSubscription!: Subscription;

  constructor(
    private menuService: MenuService,
    public utils: UtilsService,
    public ns: NotificationsService,
    public authService: AuthService,
    private permissionService: PermissionService
  ) {
    
  }

  ngOnInit(): void {
    const getDashboardRouteLists = dashboardRouteLists(this.permissionService.isAdhocStaff);
    this.primaryRouteList = getDashboardRouteLists.primary
    this.secondaryRouteList = getDashboardRouteLists.secondary

    this.currentUser$ = this.authService.onCurrentUser();
    this.unreadCountSubscription = this.ns.unreadCount$.subscribe((value) => {
      if (value > 0) {
        this.secondaryRouteList[0].title = `Notifications (${value})`;
      } else {
        this.secondaryRouteList[0].title = `Notifications`;
      }
    });
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  toggleMenu() {
    this.menuService.toggleState();
  }

  ngOnDestroy(): void {
    this.unreadCountSubscription.unsubscribe();
  }
}
