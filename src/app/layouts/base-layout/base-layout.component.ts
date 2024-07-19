import { Component } from '@angular/core';
import { NavbarComponent } from '@core/components/base/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from '@shared/components/container/container.component';

@Component({
  selector: 'base-layout',
  standalone: true,
  imports: [NavbarComponent, RouterModule, ContainerComponent],
  template: `
    <div class="h-screen flex flex-col">
      <base-navbar></base-navbar>
      <app-container clx="grow">
        <router-outlet></router-outlet>
      </app-container>
    </div>
  `,
})
export class BaseLayoutComponent {}
