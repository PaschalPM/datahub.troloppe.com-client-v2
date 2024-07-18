import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
  standalone: true,
})
export class ClickOutsideDirective {
  private display = true;
  @Output() clickOutside = new EventEmitter();

  constructor(private element: ElementRef<HTMLElement>) {}

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (this.display) {
      this.display = false;
      return;
    }
    const clickedInside = this.element.nativeElement.contains(
      event.target as Node
    );

    if (!clickedInside) {
      this.clickOutside.emit(event);
    }
  }
}
