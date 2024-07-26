import { Component } from '@angular/core';
import { MyMatIconComponent } from "../my-mat-icon/my-mat-icon.component";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [MyMatIconComponent],
  templateUrl: './modal.component.html',
})
export class ModalComponent {

}
