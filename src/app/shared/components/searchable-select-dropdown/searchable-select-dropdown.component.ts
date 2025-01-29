import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextButtonComponent } from '@core/components/dashboard/text-btn/text-btn.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ColorSchemeService } from '@shared/services/color-scheme.service';
import { UtilsService } from '@shared/services/utils.service';
import { debounceTime, distinctUntilChanged, map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { InputFieldErrorSectionComponent } from '../input-field-error-section/input-field-error-section.component';
import { FormSubmissionService } from '@shared/services/form-submission.service';
import { MyMatIconComponent } from "../my-mat-icon/my-mat-icon.component";
import { SelectDropdownService } from '@shared/services/select-dropdown.service';

@Component({
  selector: 'app-searchable-select-dropdown',
  standalone: true,
  imports: [ReactiveFormsModule, NgSelectModule, CommonModule, TextButtonComponent, InputFieldErrorSectionComponent, MyMatIconComponent],
  templateUrl: './searchable-select-dropdown.component.html',
  styleUrl: './searchable-select-dropdown.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SearchableSelectDropdownComponent implements OnDestroy {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) formGroup!: FormGroup;
  @Input({ required: true }) loading = false
  @Input({ required: true }) items!: any[]
  @Input() showAddBtn = false
  @Input() bindLabel = "name"
  @Input() bindValue = "id"
  @Input() bindSubLabel!: string

  @Output() searchParamChange = new EventEmitter<string>()
  @Output() scrollEnd = new EventEmitter()
  @Output() valueChange = new EventEmitter()

  formControl!: FormControl
  isDarkMode$: Observable<boolean>
  search$ = new Subject<string>();
  destroy$ = new Subject<void>();
  formIsSubmitting = false;
  selectClx = this.utils.cn(
    'select focus:outline-secondary w-full select-bordered rounded-md',
    { 'select-error': this.formIsSubmitting && this.formControl.errors }
  )
  isRequired = true
  constructor(
    private readonly colorScheme: ColorSchemeService,
    private readonly formSubmit: FormSubmissionService,
    public readonly utils: UtilsService,
    public readonly selectDropdownService: SelectDropdownService
  ) {
    this.isDarkMode$ = this.colorScheme.getActualColorScheme().pipe(map((value) => {
      return value === "dark"
    }))
  }

  ngOnInit(): void {
    this.emitSearchParamInput()
    this.setFormIsSubmitting();
    this.formControl = this.formGroup.get(this.name) as FormControl
    this.isRequired = this.formControl.hasValidator(Validators.required)
  }

  onChange(value: number) {
    const selectedItem = this.items.find((v) => v.id === value)
    this.valueChange.emit(selectedItem)
  }

  private emitSearchParamInput() {
    this.search$.pipe(debounceTime(500), distinctUntilChanged(), tap(searchTerm => {
      this.searchParamChange.emit(searchTerm)
    }), takeUntil(this.destroy$))
      .subscribe()
  }

  private setFormIsSubmitting() {
    this.formSubmit.formSubmitEvent
      .pipe(takeUntil(this.destroy$)).subscribe(
        (value) => {
          if (value.formGroup === this.formGroup) {
            this.formIsSubmitting = value.isSubmitting;
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
