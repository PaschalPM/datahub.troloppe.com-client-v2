import { Component, HostBinding, HostListener } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { SideMenuComponent } from '@shared/components/side-menu/side-menu.component';
import { ContainerComponent } from '@shared/components/container/container.component';
import { NavbarComponent } from '@core/components/dashboard/navbar/navbar.component';
import { UtilsService } from '@shared/services/utils.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { RouteListComponent } from '../../shared/components/route-list/route-list.component';
import { MenuService } from '@shared/services/menu.service';
import { dashboardRouteLists } from '@shared/services/constants/route-lists';
import { NotificationsService } from '@core/services/dashboard/notifications.service';
import { MediaQueryService } from '@shared/services/media-query.service';
import { LARGE_SCREEN_SIZE } from '@shared/services/constants/media-query';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterModule,
    SideMenuComponent,
    ContainerComponent,
    NavbarComponent,
    RouteListComponent,
    AsyncPipe
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  @HostBinding('class.dashboard-menu-open')
  isMenuOpen = false;
  notificationCount = 0;
  title = 'Home';

  LARGE_SCREEN_SIZE = LARGE_SCREEN_SIZE

  // Route List Component has withHomeRoute set to false
  primaryRouteList: RouteType[] = dashboardRouteLists.primary;
  secondaryRouteList: RouteType[] = dashboardRouteLists.secondary;

  @HostListener('window:focus', ['$event'])
  onWindowFocus() {
    this.getNotificationsSubscription = this.ns.getNotifications().subscribe();
  }

  private routerSubscription!: Subscription;
  private menuIsOpenSubscription!: Subscription;
  private getNotificationsSubscription!: Subscription;
  private unreadCountSubscription!: Subscription;

  constructor(
    public utils: UtilsService,
    private pageTitle: Title,
    private router: Router,
    private menuService: MenuService,
    private ns: NotificationsService, 
    public mediaQuery: MediaQueryService
  ) {}

  ngOnInit(): void {
    this.setDashboardTitle();
    this.menuIsOpenSubscription = this.menuService
      .isOpen()
      .subscribe((value) => {
        this.isMenuOpen = value;
      });
    this.getNotificationsSubscription = this.ns.getNotifications().subscribe();
    this.unreadCountSubscription = this.ns.unreadCount$.subscribe((value) => {
      if (value > 0) {
        this.secondaryRouteList[0].title = `Notifications (${value})`;
      } else {
        this.secondaryRouteList[0].title = `Notifications`;
      }
    });
  }

  private setDashboardTitle() {
    this.title = this.pageTitle.getTitle();
    this.routerSubscription = this.router.events.subscribe({
      next: (value) => {
        if (value instanceof NavigationEnd) {
          setTimeout(() => {
            this.title = this.pageTitle.getTitle();
          });
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.menuIsOpenSubscription.unsubscribe();
    this.getNotificationsSubscription.unsubscribe();
    this.unreadCountSubscription.unsubscribe();
  }
}
