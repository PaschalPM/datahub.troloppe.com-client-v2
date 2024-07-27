import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [],
  templateUrl: './loader.component.html',
  styles:`
    :host {
      display: contents
    }
  `
})
export class LoaderComponent {
  @Input() text = ''
}
