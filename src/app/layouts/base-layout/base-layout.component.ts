import { Component } from '@angular/core';
import { NavbarComponent } from '@core/components/base/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { ContainerComponent } from '@shared/components/container/container.component';

@Component({
  selector: 'base-layout',
  standalone: true,
  imports: [NavbarComponent, RouterModule, ContainerComponent],
  template: `
    <base-navbar></base-navbar>
    <app-container>
      <router-outlet></router-outlet>
    </app-container>
  ` 
})
export class BaseLayoutComponent {

}
