import { NgIf } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule, NgIf],
  template: `
    <div
      [class]="
        utils.cn('min-h-screen flex items-center justify-center bg-base-100', {
          'min-h-full': insideDashboardView
        })
      "
    >
      <div class="text-center">
        <h1
          class="text-9xl font-bold"
        >
          404
        </h1>
        <p
          class='text-2xl font-semibold text-base-content/70 mt-4'
        >
          Oops! {{ resourceName || 'Page' }} Not Found
        </p>
        <p class="text-base-content/60 mt-2" *ngIf="!insideDashboardView">
          The page you are looking for doesn't exist or an other error occurred.
        </p>
        <a
          *ngIf="!insideDashboardView"
          routerLink="/dashboard"
          class="mt-6 inline-block px-5 py-3 bg-accent text-sm text-accent-content uppercase font-medium rounded hover:bg-accent/80"
        >
          Go back home
        </a>
      </div>
    </div>
  `,
})
export class NotFoundComponent {
  @Input() insideDashboardView = false;
  @Input() resourceName = '';
  utils = inject(UtilsService);
}
