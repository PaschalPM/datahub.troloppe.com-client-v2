import { Component } from '@angular/core';
import { ContainerComponent } from '@shared/components/container/container.component';
import { ColorSchemeComponent } from '@shared/components/color-scheme/color-scheme.component';
import { BackBtnComponent } from "@shared/components/back-btn/back-btn.component";

@Component({
  selector: 'auth-navbar',
  standalone: true,
  imports: [ContainerComponent, ColorSchemeComponent, BackBtnComponent],
  template: `
    <div>
      <app-container clx="navbar md:px-6">
        <div class="navbar-start">
          <app-back-btn></app-back-btn>
        </div>
        <div class="navbar-end">
          <app-color-scheme></app-color-scheme>
        </div>
      </app-container>
    </div>
  `,
})
export class NavbarComponent {}
