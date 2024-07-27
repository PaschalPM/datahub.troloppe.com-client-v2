import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  template: '',
})
export class EmailVerificationAndLoginHelper {
  @Input({ required: true }) loginFormGroup!: FormGroup;
  @Input({ required: true }) stage!: EmailVerificationAndLoginStageType;
  @Output() stageChange =
    new EventEmitter<EmailVerificationAndLoginStageType>();

  loading = false;

  protected switchStage(stage: EmailVerificationAndLoginStageType) {
    this.stage = stage;
    this.stageChange.emit(stage);
  }
}
