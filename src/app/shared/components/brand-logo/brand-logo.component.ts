import { AsyncPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-brand-logo',
  standalone: true,
  imports: [RouterModule, AsyncPipe],
  template: `<a routerLink="/" [class]="clx">
    <img [src]="imgSrc$ | async" alt="datahub.troloppe.com" />
  </a>`,
})
export class BrandLogoComponent {
  @Input() clx = '';

  imgSrc$!: Observable<string>;

  constructor(private colorSchemeService: ColorSchemeService) {
    this.imgSrc$ = this.colorSchemeService.getActualColorScheme().pipe(
      switchMap((value) => {
        return value === 'dark'
          ? of('assets/SunsetDataHUBLogo.svg')
          : of('assets/BlackDataHUBLogo.svg');
      })
    );
  }
}
