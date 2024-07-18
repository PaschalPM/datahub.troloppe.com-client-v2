import { animate, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { fadeInOut } from '@shared/animations';
import { MenuService } from '@shared/services/menu.service';
import { UtilsService } from '@shared/services/utils.service';

@Component({
  selector: 'app-menu-backdrop',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  template: `
    <div
      *ngIf="menuService.isOpen() | async"
      @fadeInOut
      class="bg-neutral/60 fixed inset-0 z-[2]"
      (click)="closeMenu($event)"
    ></div>
  `,
  animations: [
    fadeInOut()
  ],
})
export class MenuBackdropComponent {
  constructor(public menuService: MenuService, public utils: UtilsService) {}
  closeMenu(event: Event) {
    if (event.currentTarget === event.target) {
      this.menuService.toggleState();
    }
  }
}

// [class]="
//         utils.cn(
//           'bg-neutral/50 fixed inset-0 z-[2] -translate-x-full transition-all duration-75',
//           { 'translate-x-0 ': (menuService.isOpen() | async) }
//         )
//       "
