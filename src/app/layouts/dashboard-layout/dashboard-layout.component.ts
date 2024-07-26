import { Component, HostBinding } from '@angular/core';
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

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    RouterModule,
    SideMenuComponent,
    ContainerComponent,
    NavbarComponent,
    RouteListComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
})
export class DashboardLayoutComponent {
  @HostBinding('class.dashboard-menu-open')
  isMenuOpen = false;

  title = 'Home';

  // Route List Component has withHomeRoute set to false
  primaryRouteList: RouteType[] = dashboardRouteLists.primary;
  secondaryRouteList: RouteType[] = dashboardRouteLists.secondary;


  private routerSubscription!: Subscription;
  constructor(
    public utils: UtilsService,
    private pageTitle: Title,
    private router: Router,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {
    this.setDashboardTitle();
    this.menuService.isOpen().subscribe((value) => {
      this.isMenuOpen = value;
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
  }
}
