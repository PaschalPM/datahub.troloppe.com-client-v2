import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

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
          [routerLinkActive]="activeRouteClass"
          [routerLinkActiveOptions]="{ exact: true }"
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
}
