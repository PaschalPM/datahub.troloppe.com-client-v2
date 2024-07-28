import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { fadeInOut } from '@shared/animations';

@Component({
  selector: 'dashboard-mini-drawer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative">
      <button
        #toggleBtn
        class="-mt-2 font-medium md:hidden"
        (click)="toggleMiniDrawer()"
      >
        ...
      </button>
      <div
        @fadeInOut
        #drawerContent
        *ngIf="showMiniDrawer"
        class="absolute right-2 top-6 min-h-10 min-w-36 bg-base-100  p-4 text-left text-sm shadow-lg  md:hidden"
      >
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [fadeInOut],
 
})
export class MiniDrawerComponent {
  @Input({ required: true }) showMiniDrawer = false;
  @Output() showMiniDrawerChange = new EventEmitter();
  @ViewChild('toggleBtn') toggleBtnRef!: ElementRef;
  @ViewChild('drawerContent') drawerContentRef!: ElementRef;

  @HostListener('document:click', ['$event'])
  closeMiniDrawer(event: Event) {
    const clickedToggleBtn = this.toggleBtnRef?.nativeElement.contains(
      event.target
    );
    const clickedDrawerContent = this.drawerContentRef?.nativeElement.contains(
      event.target
    );

    if (!(clickedToggleBtn || clickedDrawerContent)) {
      this.showMiniDrawer = false;
      this.showMiniDrawerChange.emit(this.showMiniDrawer);
    }
  }

  toggleMiniDrawer() {
    this.showMiniDrawer = !this.showMiniDrawer;
    this.showMiniDrawerChange.emit(this.showMiniDrawer);
  }
}
