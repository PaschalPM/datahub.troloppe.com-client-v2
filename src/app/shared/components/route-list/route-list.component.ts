import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-route-list',
  standalone: true,
  imports: [RouterModule],
  template: `
    <ul [class]="clx">
      @if(withHomeRoute) {
      <li>
        <a
          [routerLink]="forDashboard ? '/dashboard' : '/'"
          [class]="isHomeActive ? activeRouteClass : ''"

          >
          Home
        </a>
      </li>
      } @for(route of routeList; track route) {
      <li>
        <a
          [routerLink]="route.routerLink"
          [routerLinkActive]="activeRouteClass"
          >{{ route.title }}</a
        >
      </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: contents
    }
  `,
})
export class RouteListComponent {
  @Input({ required: true }) routeList!: RouteType[];
  @Input({ required: true }) activeRouteClass!: string;
  @Input() withHomeRoute = true;
  @Input() forDashboard = false;
  @Input() clx = '';

  constructor(private readonly router: Router) { }

  get isHomeActive() {
    if (this.forDashboard) {

      return this.router.isActive('/dashboard', { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' })
    }
    return this.router.isActive('/', { paths: 'exact', queryParams: 'ignored', matrixParams: 'ignored', fragment: 'ignored' })

  }


}
