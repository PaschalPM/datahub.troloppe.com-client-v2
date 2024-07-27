import { Component, Type } from '@angular/core';
import { MyMatIconComponent } from '../my-mat-icon/my-mat-icon.component';
import { ModalService } from '@shared/services/modal.service';
import { CommonModule } from '@angular/common';
import { ClickSelfDirective } from '@shared/directives/click-self.directive';
import { KeyupEscapeDirective } from '@shared/directives/keyup-escape.directive';
import { modalTrigger } from '@shared/animations';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ClickSelfDirective, KeyupEscapeDirective, MyMatIconComponent],
  templateUrl: './modal.component.html',
  animations: [modalTrigger]
})
export class ModalComponent {
  template!: Type<any>;
  inputs!: Record<string, unknown> | undefined;

  constructor(public modalService: ModalService) {
    this.modalService.listen((template, inputs) => {
      this.template = template;
      this.inputs = inputs;
    });
  }
}
